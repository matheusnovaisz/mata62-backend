import { Module } from '@nestjs/common';
import { DiplomaService } from './diploma.service';
import { DiplomaController } from './diploma.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Diploma } from './entities/diploma.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');
import { CaslModule } from 'src/casl/casl.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Diploma]),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: function (req, file, cb) {
          const filename: string =
            path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
          const extension: string = path.parse(file.originalname).ext;
          cb(null, `${filename}${extension}`);
        },
      }),
    }),
    CaslModule,
  ],
  controllers: [DiplomaController],
  providers: [DiplomaService],
})
export class DiplomaModule {}
