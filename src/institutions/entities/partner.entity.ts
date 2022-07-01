import { ChildEntity, ManyToOne } from 'typeorm';
import { Institution } from './institution.entity';
import { ValidatorInstitution } from './validator.entity';

@ChildEntity()
export class PartnerInstitution extends Institution {
  @ManyToOne(() => ValidatorInstitution, (institution) => institution.partners)
  validator: Institution;
}
