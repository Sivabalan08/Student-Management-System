import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users_v2')
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ unique: true, nullable: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}
