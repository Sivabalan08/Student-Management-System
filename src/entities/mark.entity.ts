
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('marks_records')
export class Mark {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string; // Storing student name directly for simplicity as requested by User/Form

    @Column()
    subject: string;

    @Column('int')
    marks: number;

    @Column()
    grade: string;
}
