import { ChildEntity, OneToMany } from 'typeorm';
import { Institution } from './institution.entity';
import { PartnerInstitution } from './partner.entity';

@ChildEntity()
export class ValidatorInstitution extends Institution {
  @OneToMany(() => PartnerInstitution, (partner) => partner.validator)
  partners: PartnerInstitution[];
}
