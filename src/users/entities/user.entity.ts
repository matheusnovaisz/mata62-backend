import { hash } from 'bcrypt';
import { Exclude } from 'class-transformer';
import { Institution } from 'src/institutions/entities/institution.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../enums/roles.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.FUNCIONARIO,
  })
  role: Role;

  @Exclude()
  @Column({ default: false })
  is_admin: boolean;

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

  @ManyToOne(() => Institution, (institution) => institution.users)
  institution: Institution;

  @Column({ nullable: true })
  institution_id: number;

  @BeforeInsert()
  @BeforeUpdate()
  async hash() {
    this.password = await hash(this.password, 10);
  }
}
