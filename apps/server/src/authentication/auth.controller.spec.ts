import { Test, TestingModule } from '@nestjs/testing';

import { AuthController } from './auth.controller';

describe('AuthController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AuthController],
    }).compile();
  });

  describe('login', () => {
    it('should return hello', () => {
      const authController = app.get<AuthController>(AuthController);

      expect(authController.login()).toEqual({ message: 'hello' });
    });
  });
});
