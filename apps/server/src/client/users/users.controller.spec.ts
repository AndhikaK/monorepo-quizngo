import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { JwtAuthGuard } from '@/authentication/guards/jwt-auth.guard';
import { AuthenticatedRequest } from '@/authentication/interfaces/authenticated-request.interface';
import { AppLogger } from '@/common/logger/app.logger';

import { User } from './entities/users.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const mockUsersService = {
      findUserByEmail: jest.fn(),
      patchCurrentUser: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useValue: mockUsersService },
        JwtAuthGuard,
        AppLogger,
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  describe('currentUser', () => {
    it('should return current user information', async () => {
      const mockUser = { email: 'test@example.com', name: 'Test User' } as User;
      jest.spyOn(usersService, 'findUserByEmail').mockResolvedValue(mockUser);

      const req = {
        user: { email: 'test@example.com' },
      } as AuthenticatedRequest;
      const result = await controller.currentUser({ user: req.user } as any);
      expect(result).toEqual(mockUser);
    });
  });

  describe('patchCurrentUser', () => {
    it('should update user information and return status OK', async () => {
      const mockFile = {
        buffer: Buffer.from('file-content'),
      } as Express.Multer.File;
      const body = { name: 'Updated User' };
      jest.spyOn(usersService, 'patchCurrentUser').mockResolvedValue(undefined);

      const req = {
        user: { email: 'test@example.com' },
      } as AuthenticatedRequest;
      const result = await controller.patchCurrentUser(
        { user: req.user } as any,
        mockFile,
        body
      );
      expect(result.status).toBe(HttpStatus.OK);
    });
  });
});
