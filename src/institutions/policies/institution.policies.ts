import { Inject } from '@nestjs/common';
import { AppAbility } from 'src/casl/casl-ability.factory';
import { IPolicyHandler } from 'src/casl/decorators/policies.decorator';
import { Action } from 'src/casl/enums/actions.enum';
import { User } from 'src/users/entities/user.entity';
import { Institution } from '../entities/institution.entity';
import { InstitutionsService } from '../institutions.service';

export class ReadInstitutionPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Read, Institution);
  }
}

export class CreateInstitutionPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Create, Institution);
  }
}

export class UpdateInstitutionPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Update, Institution);
  }
}

export class DeleteInstitutionPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Delete, Institution);
  }
}
