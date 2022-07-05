import { AppAbility } from 'src/casl/casl-ability.factory';
import { IPolicyHandler } from 'src/casl/decorators/policies.decorator';
import { Action } from 'src/casl/enums/actions.enum';
import { Course } from '../entities/course.entity';

export class ReadCoursePolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Read, Course);
  }
}

export class CreateCoursePolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Create, Course);
  }
}

export class UpdateCoursePolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Update, Course);
  }
}

export class DeleteCoursePolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Delete, Course);
  }
}
