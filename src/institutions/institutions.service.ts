import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddPartnerDto } from './dto/add-partner.dto';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { RemovePartnerDto } from './dto/remove-partner.dto';
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
      if (createInstitutionDto.type === ValidatorInstitution.name) {
        const institution =
          this.validatorRepository.create(createInstitutionDto);
        await this.validatorRepository.save(institution);
        return institution;
      }
      const institution = this.partnerRepository.create(createInstitutionDto);
      await this.partnerRepository.save(institution);
      return institution;
    } catch (error) {
      throw error;
    }
  }

  findAll({ type }: { type: string }) {
    if (!type || type === 'Institution')
      return this.institutionRepository.find();
    else if (type === 'PartnerInstitution')
      return this.partnerRepository.find();
    else if (type === 'ValidatorInstitution')
      return this.validatorRepository.find();
    else throw new BadRequestException('Type of institution not valid');
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
      throw new NotFoundException(
        "Institution is not a PartnerInstitution or doesn't exists",
      );
    }
  }

  async findUsers(id: number) {
    try {
      const institution = await this.institutionRepository.findOneOrFail({
        where: { id },
        relations: ['users'],
      });
      return institution;
    } catch (error) {
      throw new NotFoundException('Institution not found');
    }
  }

  async findPartners(id: number) {
    try {
      const institution = await this.validatorRepository.findOneOrFail({
        where: { id },
        relations: ['partners'],
      });
      return institution;
    } catch (error) {
      throw new NotFoundException(
        "Institution is not a ValidatorInstitution or doesn't exists",
      );
    }
  }

  async addPartner(id: number, addPartnerDto: AddPartnerDto) {
    try {
      const partner = await this.partnerRepository.findOneOrFail({
        where: { id: addPartnerDto.partner_id },
      });
      await this.partnerRepository.save({ ...partner, validator_id: id });
      const institution = await this.validatorRepository.findOneOrFail({
        where: { id },
        relations: ['partners'],
      });
      return institution;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async removePartner(id: number, removePartnerDto: RemovePartnerDto) {
    try {
      const partner = await this.partnerRepository.findOneOrFail({
        where: { id: removePartnerDto.partner_id },
      });
      await this.partnerRepository.save({ ...partner, validator_id: null });
      const institution = await this.validatorRepository.findOneOrFail({
        where: { id },
        relations: ['partners'],
      });
      return institution;
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
