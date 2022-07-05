import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { InstitutionsService } from './institutions.service';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PoliciesGuard } from 'src/casl/guards/policies.guard';
import { CheckPolicies } from 'src/casl/decorators/policies.decorator';
import {
  CreateInstitutionPolicyHandler,
  DeleteInstitutionPolicyHandler,
  ReadInstitutionPolicyHandler,
  UpdateInstitutionPolicyHandler,
} from './policies/institution.policies';
import { AddPartnerDto } from './dto/add-partner.dto';
import { RemovePartnerDto } from './dto/remove-partner.dto';

@UseGuards(JwtAuthGuard, PoliciesGuard)
@Controller('institutions')
export class InstitutionsController {
  constructor(private readonly institutionsService: InstitutionsService) {}

  @CheckPolicies(new CreateInstitutionPolicyHandler())
  @Post()
  create(@Body() createInstitutionDto: CreateInstitutionDto) {
    return this.institutionsService.create(createInstitutionDto);
  }

  @CheckPolicies(new ReadInstitutionPolicyHandler())
  @Get()
  findAll(@Query('type') type: string) {
    return this.institutionsService.findAll({ type });
  }

  @CheckPolicies(new ReadInstitutionPolicyHandler())
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.institutionsService.findOne(+id);
  }

  @CheckPolicies(new UpdateInstitutionPolicyHandler())
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInstitutionDto: UpdateInstitutionDto,
  ) {
    return this.institutionsService.update(+id, updateInstitutionDto);
  }

  @CheckPolicies(new DeleteInstitutionPolicyHandler())
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.institutionsService.remove(+id);
  }

  @CheckPolicies(new ReadInstitutionPolicyHandler())
  @Get(':id/courses')
  findCourses(@Param('id') id: string) {
    return this.institutionsService.findCourses(+id);
  }

  @CheckPolicies(new ReadInstitutionPolicyHandler())
  @Get(':id/users')
  findUsers(@Param('id') id: string) {
    return this.institutionsService.findUsers(+id);
  }

  @CheckPolicies(new ReadInstitutionPolicyHandler())
  @Get(':id/partners')
  findPartners(@Param('id') id: string) {
    return this.institutionsService.findPartners(+id);
  }

  @CheckPolicies(new UpdateInstitutionPolicyHandler())
  @Post(':id/partners')
  addPartner(@Param('id') id: string, @Body() addPartnerDto: AddPartnerDto) {
    return this.institutionsService.addPartner(+id, addPartnerDto);
  }
  @CheckPolicies(new UpdateInstitutionPolicyHandler())
  @Delete(':id/partners')
  removePartner(
    @Param('id') id: string,
    @Body() removePartnerDto: RemovePartnerDto,
  ) {
    return this.institutionsService.removePartner(+id, removePartnerDto);
  }
}
