import { Diploma } from 'src/diploma/entities/diploma.entity';
import { PartnerInstitution } from 'src/institutions/entities/partner.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  degree: string;

  @Column()
  emec: string;

  @Column({ nullable: true })
  authorization: string;

  @Column({ nullable: true })
  recognition: string;

  @Column({ nullable: true })
  renovation: string;

  @Column({ nullable: true })
  observation: string;

  @ManyToOne(() => PartnerInstitution, (institution) => institution.courses, {
    onDelete: 'CASCADE',
  })
  institution: PartnerInstitution;

  @Column({ nullable: true })
  institution_id: number;

  @OneToMany(() => Diploma, (diploma) => diploma.course)
  diplomas: Diploma[];
}
