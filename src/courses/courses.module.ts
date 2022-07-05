import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { InstitutionsModule } from 'src/institutions/institutions.module';
import { PartnerInstitution } from 'src/institutions/entities/partner.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Course, PartnerInstitution]),
    InstitutionsModule,
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
