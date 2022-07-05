import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { InstitutionsService } from './institutions.service';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';
import { AddPartnerDto } from './dto/add-partner.dto';
import { RemovePartnerDto } from './dto/remove-partner.dto';

@Controller('institutions')
export class InstitutionsController {
  constructor(private readonly institutionsService: InstitutionsService) {}

  @Post()
  create(@Body() createInstitutionDto: CreateInstitutionDto) {
    return this.institutionsService.create(createInstitutionDto);
  }

  @Get()
  findAll(@Query('type') type: string) {
    return this.institutionsService.findAll({ type });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.institutionsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInstitutionDto: UpdateInstitutionDto,
  ) {
    return this.institutionsService.update(+id, updateInstitutionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.institutionsService.remove(+id);
  }

  @Get(':id/courses')
  findCourses(@Param('id') id: string) {
    return this.institutionsService.findCourses(+id);
  }

  @Get(':id/users')
  findUsers(@Param('id') id: string) {
    return this.institutionsService.findUsers(+id);
  }

  @Get(':id/partners')
  findPartners(@Param('id') id: string) {
    return this.institutionsService.findPartners(+id);
  }

  @Post(':id/partners')
  addPartner(@Param('id') id: string, @Body() addPartnerDto: AddPartnerDto) {
    return this.institutionsService.addPartner(+id, addPartnerDto);
  }
  @Delete(':id/partners')
  removePartner(
    @Param('id') id: string,
    @Body() removePartnerDto: RemovePartnerDto,
  ) {
    return this.institutionsService.removePartner(+id, removePartnerDto);
  }
}
