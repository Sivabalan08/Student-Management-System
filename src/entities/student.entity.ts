
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('students')
export class Student {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    regNo: string;

    @Column()
    email: string;

    @Column({ nullable: true })
    phone: string;

    @Column({ type: 'date', nullable: true }) // Using 'date' type for Postgres
    dob: string;

    @Column()
    course: string;
}
