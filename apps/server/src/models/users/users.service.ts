import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FilesService } from '@/models/files/files.service';

import { User } from './entities/users.entity';
import { ICreateUser } from './interfaces/create-user.interface';

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
    return this.userRepository.findOneBy({
      email,
    });
  }

  async createUser(data: ICreateUser) {
    return await this.userRepository.insert(data);
  }

  async uploadDisplayPicture(user: User, fileBuffer: Buffer) {
    const path = 'display-pictures';
    const displayPictureUrl = await this.fileService.upload(
      fileBuffer,
      user.id,
      path
    );

    await this.userRepository.update(
      { display_picture_url: displayPictureUrl },
      { id: user.id }
    );
  }
}
