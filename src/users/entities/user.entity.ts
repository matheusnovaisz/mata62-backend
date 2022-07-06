import { hash } from 'bcrypt';
import { Exclude } from 'class-transformer';
import { Diploma } from 'src/diploma/entities/diploma.entity';
import { Institution } from 'src/institutions/entities/institution.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
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

  @ManyToOne(() => Institution, (institution) => institution.users, {
    onDelete: 'SET NULL',
  })
  institution: Institution;

  @Column({ nullable: true })
  institution_id: number;

  @OneToMany(
    () => Diploma,
    (diploma) => diploma.applicant || diploma.validator,
    { onDelete: 'SET NULL' },
  )
  validation: Diploma[];

  @BeforeInsert()
  @BeforeUpdate()
  async hash() {
    this.password = await hash(this.password, 10);
  }
}
