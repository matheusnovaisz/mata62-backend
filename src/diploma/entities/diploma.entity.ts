import { Course } from 'src/courses/entities/course.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Status } from '../enums/status.enum';

@Entity()
export class Diploma {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Course, (course) => course.diplomas, { onDelete: 'CASCADE' })
  course: Course;

  @Column()
  course_id: number;

  @Column()
  file: string;

  @ManyToOne(() => User, (user) => user.validation, { onDelete: 'SET NULL' })
  applicant: User;

  @Column({ nullable: true })
  applicant_id: number;

  @Column()
  student_name: string;

  @Column({ type: 'enum', enum: Status, default: Status.ANALISE })
  status: Status;

  @ManyToOne(() => User, (user) => user.validation, { onDelete: 'SET NULL' })
  validator: User;

  @Column({ nullable: true })
  validator_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
