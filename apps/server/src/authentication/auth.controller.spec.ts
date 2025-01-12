import { Test, TestingModule } from '@nestjs/testing';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn().mockReturnValue({
              access_token: 'access_token',
            }),
          },
        },
      ],
    }).compile();
  });

  describe('login', () => {
    it('should return hello', () => {
      const authController = app.get<AuthController>(AuthController);

      expect(authController.login()).toEqual({ access_token: 'access_token' });
    });
  });
});
