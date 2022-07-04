import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Course } from 'src/courses/entities/course.entity';
import { Institution } from 'src/institutions/entities/institution.entity';
import { User } from 'src/users/entities/user.entity';
import { Role } from 'src/users/enums/roles.enum';
import { Action } from './enums/actions.enum';

type Subjects =
  | InferSubjects<typeof Institution | typeof User | typeof Course>
  | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    if (user.is_admin) {
      can(Action.Manage, 'all');
    }
    if (user.role === Role.SUPERINTENDENTE) {
      can(Action.Manage, Institution, { id: user.institution?.id });
    } else if (user.role === Role.FUNCIONARIO) {
      can(Action.Manage, Course, { institution: user.institution });
    } else if (user.role === Role.DIRETOR) {
      can(Action.Manage, User, {
        institution: user.institution,
        is_admin: false,
      });
      can(Action.Update, Institution, { id: user.institution?.id });
    }
    can(Action.Read, 'all');

    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
