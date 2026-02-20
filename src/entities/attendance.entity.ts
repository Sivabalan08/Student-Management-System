
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('attendance_records')
export class Attendance {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string; // Storing student name directly for simplicity as requested by User/Form

    @Column({ type: 'date' })
    date: string;

    @Column()
    status: string;

    @Column({ nullable: true })
    remarks: string;
}
