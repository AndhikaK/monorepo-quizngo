import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async getUserById(id: string) {
    return this.userRepository.findOneBy({ id });
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findUserByEmail(email: string) {
    return this.userRepository.findOneBy({
      email,
    });
  }
}
