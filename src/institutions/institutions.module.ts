import { Module } from '@nestjs/common';
import { InstitutionsService } from './institutions.service';
import { InstitutionsController } from './institutions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValidatorInstitution } from './entities/validator.entity';
import { PartnerInstitution } from './entities/partner.entity';
import { Institution } from './entities/institution.entity';
import { CaslModule } from 'src/casl/casl.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Institution,
      ValidatorInstitution,
      PartnerInstitution,
    ]),
    CaslModule,
  ],
  controllers: [InstitutionsController],
  providers: [InstitutionsService],
  exports: [InstitutionsService],
})
export class InstitutionsModule {}
