
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { DataInitService } from './data-init.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private dataInitService: DataInitService,
    private jwtService: JwtService
  ) { }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (!user) {
      return null;
    }

    // Try bcrypt comparison
    try {
      const isMatch = await bcrypt.compare(pass, user.password);
      if (isMatch) {
        const { password, ...result } = user;
        return result;
      }
    } catch (e) {
      // Validation failed or password not hashed. Fall through to plain text check.
    }

    // Fallback: Check plain text
    if (user.password === pass) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: any) {
    // Initialize data on first successful login
    this.dataInitService.initialize();

    const role = user.email.toLowerCase().endsWith('@student.com') ? 'student' : 'staff';
    const payload = { email: user.email, sub: user.id, role };
    return {
      access_token: this.jwtService.sign(payload),
      role: role,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username
    };
  }

  async register(user: any) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(user.password, salt);
    const newUser = {
      ...user,
      password: hashedPassword,
    };
    return this.usersService.create(newUser);
  }
}
