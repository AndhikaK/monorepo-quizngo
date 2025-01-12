import { Test } from '@nestjs/testing';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = app.get<UserService>(UserService);
  });

  describe('getUserById', () => {
    it('should return correct user by id', () => {
      expect(service.getUserById('random_id')).toHaveProperty('id');
    });
  });
});
