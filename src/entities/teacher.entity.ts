
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('teachers')
export class Teacher {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    staffId: string;

    @Column()
    department: string;

    @Column()
    email: string;

    @Column({ nullable: true })
    phone: string;

    @Column({ type: 'date', nullable: true })
    dob: string;

    @Column({ nullable: true })
    address: string;
}
