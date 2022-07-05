import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PartnerInstitution } from 'src/institutions/entities/partner.entity';
import { InstitutionsService } from 'src/institutions/institutions.service';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    @InjectRepository(PartnerInstitution)
    private partnerRepository: Repository<PartnerInstitution>,
  ) {}
  async create(createCourseDto: CreateCourseDto) {
    const institution = await this.partnerRepository.findOneByOrFail({
      id: createCourseDto.institution_id,
    });
    const course = await this.courseRepository.create({
      ...createCourseDto,
      institution,
    });
    await this.courseRepository.save(course);
    return course;
  }

  findAll() {
    return this.courseRepository.find();
  }

  async findOne(id: number) {
    try {
      const course = await this.courseRepository.findOneByOrFail({ id });
      return course;
    } catch (error) {
      throw new NotFoundException('Course not found');
    }
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    try {
      const updated = await await this.courseRepository.save({
        id,
        ...updateCourseDto,
      });
      return updated;
    } catch {
      throw new NotFoundException('Course not found');
    }
  }

  async remove(id: number) {
    try {
      const course = await this.courseRepository.findOneByOrFail({ id });
      await this.courseRepository.delete(id);
      return course;
    } catch {
      throw new NotFoundException('Course not found');
    }
  }
}
