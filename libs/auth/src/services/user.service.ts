import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getAllUsers() {
    return await this.userRepository.find();
  }

  async getUserById(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }
  async getUserByUsername(username: string) {
    return await this.userRepository.findOne({ where: { username } });
  }

  async createUser(data: CreateUserDto) {
    const existingUser = await this.getUserByUsername(data.username);

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const user = this.userRepository.create(data);
    return await this.userRepository.save(user);
  }

  async updateUserById(id: number, data: UpdateUserDto) {
    await this.userRepository.update(id, data);
  }

  async deleteUserById(id: number) {
    await this.userRepository.delete(id);
  }
}
