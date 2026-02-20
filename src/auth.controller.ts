
import { Body, Controller, Post, UnauthorizedException, BadRequestException, ConflictException, InternalServerErrorException, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  async login(@Body() body: any) {
    if (!body || !body.email || !body.password) {
      throw new BadRequestException('Email and password are required');
    }
    const email = body.email.toLowerCase();

    // Domain Check for Login
    if (!email.endsWith('@student.com') && !email.endsWith('@admin.com')) {
      throw new UnauthorizedException('Access denied. Allowed domains: @student.com (Student), @admin.com (Staff)');
    }

    console.log('Login attempt:', email);
    try {
      const user = await this.authService.validateUser(email, body.password);
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }
      return this.authService.login(user);
    } catch (error) {
      console.error('Login Error:', error);
      throw error;
    }
  }

  @Post('register')
  async register(@Body() body: any) {
    if (!body || !body.email || !body.password) {
      throw new BadRequestException('Email and password are required');
    }
    try {
      const email = body.email.toLowerCase();

      // Domain Check for Registration
      if (!email.endsWith('@student.com') && !email.endsWith('@admin.com')) {
        throw new BadRequestException('Registration failed. Allowed domains: @student.com (Student), @admin.com (Staff)');
      }

      return await this.authService.register(body);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      console.error('Registration Error:', error);
      if (error.code === '23505') { // Postgres unique_violation
        throw new ConflictException('Username or Email already exists');
      }
      throw new InternalServerErrorException('Registration failed');
    }
  }
}
