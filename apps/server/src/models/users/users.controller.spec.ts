import { Test, TestingModule } from '@nestjs/testing';

import { UsersController } from './users.controller';

describe('UsersController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [UsersController],
      // {
      //   provide: AuthService,
      //   useValue: {
      //     login: jest.fn().mockReturnValue({
      //       access_token: 'access_token',
      //     }),
      //   },
      // },
    }).compile();
  });

  describe('currentUser', () => {
    it('should return current user', () => {
      const controller = app.get<UsersController>(UsersController);

      expect(controller.currentUser()).toHaveProperty('data');
    });
  });
});
