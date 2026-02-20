
// Student Controller handling database operations
import { Controller, Get, Post, Put, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { Attendance } from './entities/attendance.entity';
import { Mark } from './entities/mark.entity';
import { Teacher } from './entities/teacher.entity';

@Controller('api')
@UseGuards(AuthGuard('jwt'))
export class StudentController {
    constructor(
        @InjectRepository(Student)
        private studentRepo: Repository<Student>,
        @InjectRepository(Attendance)
        private attendanceRepo: Repository<Attendance>,
        @InjectRepository(Mark)
        private markRepo: Repository<Mark>,
        @InjectRepository(Teacher)
        private teacherRepo: Repository<Teacher>,
    ) { }

    // ---- Teacher Profile ----
    @Get('teacher')
    async getTeacher() {
        // Return the first teacher found, or null
        const teacher = await this.teacherRepo.find();
        return teacher.length > 0 ? teacher[0] : null;
    }

    @Put('teacher')
    async updateTeacher(@Body() data: any) {
        // Assume single teacher for this simple app
        const teachers = await this.teacherRepo.find();
        if (teachers.length > 0) {
            await this.teacherRepo.update(teachers[0].id, data);
            return this.teacherRepo.findOneBy({ id: teachers[0].id });
        } else {
            const newTeacher = this.teacherRepo.create(data);
            return await this.teacherRepo.save(newTeacher);
        }
    }

    // ---- Students ----

    @Get('students')
    getStudents() {
        return this.studentRepo.find();
    }

    @Post('students')
    addStudent(@Body() student: any) {
        // Remove empty id to allow auto-generation
        if (student.id === '' || student.id === null) {
            delete student.id;
        }
        return this.studentRepo.save(student);
    }

    @Put('students/:id')
    async updateStudent(@Param('id') id: string, @Body() updateData: any) {
        if (updateData.id === '' || updateData.id === null) {
            delete updateData.id;
        }
        await this.studentRepo.update(id, updateData);
        return this.studentRepo.findOneBy({ id: parseInt(id) });
    }

    @Delete('students/:id')
    deleteStudent(@Param('id') id: string) {
        return this.studentRepo.delete(id);
    }


    // ---- Attendance ----

    @Get('attendance')
    getAttendance() {
        return this.attendanceRepo.find({ order: { date: 'DESC' } });
    }

    @Post('attendance')
    addAttendance(@Body() record: any) {
        if (record.id === '' || record.id === null) {
            delete record.id;
        }
        return this.attendanceRepo.save(record);
    }

    @Put('attendance/:id')
    async updateAttendance(@Param('id') id: string, @Body() updateData: any) {
        if (updateData.id === '' || updateData.id === null) {
            delete updateData.id;
        }
        await this.attendanceRepo.update(id, updateData);
        return this.attendanceRepo.findOneBy({ id: parseInt(id) });
    }

    @Delete('attendance/:id')
    deleteAttendance(@Param('id') id: string) {
        return this.attendanceRepo.delete(id);
    }

    // ---- Marks ----

    @Get('marks')
    getMarks() {
        return this.markRepo.find();
    }

    @Post('marks')
    addMark(@Body() mark: any) {
        if (mark.id === '' || mark.id === null) {
            delete mark.id;
        }
        if (mark.marks) {
            mark.marks = Number(mark.marks);
        }
        return this.markRepo.save(mark);
    }

    @Put('marks/:id')
    async updateMark(@Param('id') id: string, @Body() updateData: any) {
        if (updateData.id === '' || updateData.id === null) {
            delete updateData.id;
        }
        if (updateData.marks) {
            updateData.marks = Number(updateData.marks);
        }
        await this.markRepo.update(id, updateData);
        return this.markRepo.findOneBy({ id: parseInt(id) });
    }

    @Delete('marks/:id')
    deleteMark(@Param('id') id: string) {
        return this.markRepo.delete(id);
    }
}
