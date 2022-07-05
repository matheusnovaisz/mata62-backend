import { Course } from 'src/courses/entities/course.entity';
import { ChildEntity, Column, ManyToOne, OneToMany } from 'typeorm';
import { Institution } from './institution.entity';
import { ValidatorInstitution } from './validator.entity';

@ChildEntity()
export class PartnerInstitution extends Institution {
  @ManyToOne(() => ValidatorInstitution, (institution) => institution.partners)
  validator: Institution;

  @Column()
  validator_id: number;

  @OneToMany(() => Course, (course) => course.institution)
  courses: Course[];
}
