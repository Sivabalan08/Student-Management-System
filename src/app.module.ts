import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from './users/users.service';
import { StudentController } from './student.controller';
import { DataInitService } from './data-init.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Student } from './entities/student.entity';
import { Teacher } from './entities/teacher.entity';
import { Mark } from './entities/mark.entity';
import { Attendance } from './entities/attendance.entity';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: 'postgres', // TODO: Update this to your actual postgres password
      database: 'student_db',
      entities: [User, Student, Teacher, Mark, Attendance],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Student, Teacher, Mark, Attendance]),
    PassportModule,
    JwtModule.register({
      secret: 'secretKey', // TODO: use environment variable
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController, StudentController],
  providers: [AuthService, UsersService, DataInitService, JwtStrategy],
})
export class AppModule { }
