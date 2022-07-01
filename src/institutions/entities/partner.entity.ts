import { Course } from 'src/courses/entities/course.entity';
import { ChildEntity, ManyToOne, OneToMany } from 'typeorm';
import { Institution } from './institution.entity';
import { ValidatorInstitution } from './validator.entity';

@ChildEntity()
export class PartnerInstitution extends Institution {
  @ManyToOne(() => ValidatorInstitution, (institution) => institution.partners)
  validator: Institution;

  @OneToMany(() => Course, (course) => course.institution)
  courses: Course[];
}
