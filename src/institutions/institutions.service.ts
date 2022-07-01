import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';
import { Institution } from './entities/institution.entity';
import { PartnerInstitution } from './entities/partner.entity';
import { ValidatorInstitution } from './entities/validator.entity';

@Injectable()
export class InstitutionsService {
  constructor(
    @InjectRepository(Institution)
    private institutionRepository: Repository<Institution>,
    @InjectRepository(PartnerInstitution)
    private partnerRepository: Repository<PartnerInstitution>,
    @InjectRepository(ValidatorInstitution)
    private validatorRepository: Repository<ValidatorInstitution>,
  ) {}
  async create(createInstitutionDto: CreateInstitutionDto) {
    try {
      const institution =
        this.institutionRepository.create(createInstitutionDto);
      await this.institutionRepository.save(institution);
      return institution;
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return this.institutionRepository.find();
  }

  findOne(id: number) {
    try {
      const institution = this.institutionRepository.findOneByOrFail({ id });
      return institution;
    } catch (error) {
      throw new NotFoundException('Institution not found');
    }
  }

  async update(id: number, updateInstitutionDto: UpdateInstitutionDto) {
    try {
      const institution = await this.institutionRepository.findOneByOrFail({
        id,
      });
      return this.institutionRepository.save({
        ...institution,
        ...updateInstitutionDto,
      });
    } catch (error) {
      throw new NotFoundException('Institution not found');
    }
  }

  async remove(id: number) {
    try {
      const institution = await this.institutionRepository.findOneByOrFail({
        id,
      });
      await this.institutionRepository.delete(id);
      return institution;
    } catch (error) {
      throw error;
    }
  }

  async findCourses(id: number) {
    try {
      const institution = await this.partnerRepository.findOneOrFail({
        where: { id },
        relations: { courses: true },
      });
      return institution;
    } catch (error) {
      throw new NotFoundException("Institution not valid or doesn't exists");
    }
  }
}
