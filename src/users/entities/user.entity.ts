import { hash } from 'bcrypt';
import { Exclude } from 'class-transformer';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../enums/roles.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.FUNCIONARIO,
  })
  role: Role;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ length: 11 })
  cpf: string;

  @Exclude()
  @Column()
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hash() {
    this.password = await hash(this.password, 10);
  }
}
