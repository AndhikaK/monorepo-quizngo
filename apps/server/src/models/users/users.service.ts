import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FilesService } from '@/models/files/files.service';

import { User } from './entities/users.entity';
import { ICreateUser } from './interfaces/create-user.interface';
import { IPathCurrentUser } from './interfaces/path-current-user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private fileService: FilesService
  ) {}

  async getUserById(id: string) {
    return this.userRepository.findOneBy({ id });
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findUserByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
      relations: ['preferences'],
    });
  }

  async createUser(data: ICreateUser) {
    return await this.userRepository.insert(data);
  }

  async patchCurrentUser(
    user: User,
    fileBuffer: Buffer,
    updatePayload: IPathCurrentUser
  ) {
    const payloadUser = new User();

    if (updatePayload.name) {
      payloadUser.name = updatePayload.name;
    }

    if (fileBuffer) {
      const path = 'display-pictures';
      payloadUser.display_picture_url = await this.fileService.upload(
        fileBuffer,
        user.id,
        path
      );
    }

    await this.userRepository.update({ id: user.id }, payloadUser);
  }
}
