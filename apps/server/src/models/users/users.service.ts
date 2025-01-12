import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  getUserById(id: string) {
    if (id !== 'random_id') return null;

    return {
      id: 'random_id',
      name: 'user 1',
    };
  }
}
