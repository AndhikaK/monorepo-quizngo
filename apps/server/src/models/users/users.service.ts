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

  getUserById(id: string) {
    if (id !== 'random_id') return null;

    return {
      id: 'random_id',
      name: 'user 1',
    };
  }

  async findAll() {
    return this.userRepository.find();
  }
}
