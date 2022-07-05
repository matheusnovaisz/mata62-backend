import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PoliciesGuard } from 'src/casl/guards/policies.guard';
import { CheckPolicies } from 'src/casl/decorators/policies.decorator';
import {
  CreateUserPolicyHandler,
  DeleteUserPolicyHandler,
  ReadUserPolicyHandler,
  UpdateUserPolicyHandler,
} from './policies/user.policies';

@UseGuards(JwtAuthGuard, PoliciesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @CheckPolicies(new CreateUserPolicyHandler())
  create(@Body() createUserDto: CreateUserDto, @Request() req) {
    if (!req.user.is_admin) {
      delete createUserDto['is_admin']; //Impede de usuarios não admin criar usuários admin
      createUserDto.institution_id = req.user.institution_id; //Cria o usuário na mesma instituição que o criador
    }
    return this.usersService.create(createUserDto);
  }

  @Get()
  @CheckPolicies(new ReadUserPolicyHandler())
  findAll() {
    return this.usersService.findAll();
  }

  @CheckPolicies(new ReadUserPolicyHandler())
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOneById(+id);
  }

  @Patch(':id')
  @CheckPolicies(new UpdateUserPolicyHandler())
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @CheckPolicies(new DeleteUserPolicyHandler())
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
