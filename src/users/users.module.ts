import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CaslModule } from 'src/casl/casl.module';
import { Institution } from 'src/institutions/entities/institution.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Institution]), CaslModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
