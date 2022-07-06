import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDiplomaDto } from './dto/create-diploma.dto';
import { UpdateDiplomaDto } from './dto/update-diploma.dto';
import { Diploma } from './entities/diploma.entity';

@Injectable()
export class DiplomaService {
  constructor(
    @InjectRepository(Diploma) private diplomaRepository: Repository<Diploma>,
  ) {}
  async create(createDiplomaDto: CreateDiplomaDto) {
    try {
      const diploma = await this.diplomaRepository.create(createDiplomaDto);
      console.log('Diploma instance', diploma);
      console.log(createDiplomaDto);
      await this.diplomaRepository.save(diploma);
      return diploma;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  findAll() {
    return this.diplomaRepository.find();
  }

  async findOne(id: number) {
    try {
      const diploma = await this.diplomaRepository.findOneOrFail({
        where: { id },
        relations: ['validator', 'applicant'],
      });
      return diploma;
    } catch {
      throw new NotFoundException('Diploma not found');
    }
  }

  async update(id: number, updateDiplomaDto: UpdateDiplomaDto) {
    try {
      const updated = await this.diplomaRepository.save({
        id,
        ...updateDiplomaDto,
      });
      return updated;
    } catch {
      throw new NotFoundException('Diploma not found');
    }
  }

  async remove(id: number) {
    try {
      const course = await this.diplomaRepository.findOneByOrFail({ id });
      await this.diplomaRepository.delete(id);
      return course;
    } catch {
      throw new NotFoundException('Diploma not found');
    }
  }
}
