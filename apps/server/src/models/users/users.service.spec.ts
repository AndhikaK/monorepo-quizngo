import { Test } from '@nestjs/testing';

import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = app.get<UsersService>(UsersService);
  });

  describe('getUserById', () => {
    it('should return correct user by id', () => {
      expect(service.getUserById('random_id')).toHaveProperty('id');
    });
  });
});
