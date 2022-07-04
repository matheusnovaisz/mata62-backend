import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User as UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const user = this.userRepository.create(createUserDto);
      await this.userRepository.save(user);
      return user;
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOneById(id: number) {
    try {
      const user = await this.userRepository.findOneOrFail({
        where: { id },
        relations: ['institution'],
      });
      return user;
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  async findOneByUsername(username: string) {
    try {
      const user = await this.userRepository.findOneOrFail({
        where: { username },
        relations: ['institution'],
      });
      return user;
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.findOneById(id);
      return this.userRepository.save({ ...user, ...updateUserDto });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async remove(id: number) {
    try {
      const user = await this.findOneById(id);
      await this.userRepository.delete(id);
      return user;
    } catch (error) {
      throw error;
    }
  }
}
