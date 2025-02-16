import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import { ErrorHttpException } from '@/common/exception/error-http.exception';
import { User } from '@/client/users/entities/users.entity';
import { UsersService } from '@/client/users/users.service';

import { AuthService } from './auth.service';

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
  hash: jest.fn(),
  genSalt: jest.fn(),
}));

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;

  beforeEach(async () => {
    const mockUsersService = {
      findUserByEmail: jest.fn(),
      createUser: jest.fn(),
    };

    const mockJwtService = {
      sign: jest.fn().mockReturnValue('mockToken'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  describe('validateUser', () => {
    it('should return a user if password matches', async () => {
      const mockUser: User = {
        id: 'user-id',
        email: 'test@example.com',
        password: 'hashedPassword',
      } as User;
      jest.spyOn(usersService, 'findUserByEmail').mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);

      const result = await authService.validateUser(
        'test@example.com',
        'plainPassword'
      );
      expect(result).toEqual(mockUser);
    });

    it('should throw an error if user is not found', async () => {
      jest.spyOn(usersService, 'findUserByEmail').mockResolvedValue(null);

      await expect(
        authService.validateUser('test@example.com', 'plainPassword')
      ).rejects.toThrowError(ErrorHttpException);
    });

    it('should throw an error if password does not match', async () => {
      const mockUser: User = {
        id: 'user-id',
        email: 'test@example.com',
        password: 'hashedPassword',
      } as User;
      jest.spyOn(usersService, 'findUserByEmail').mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false as never);

      await expect(
        authService.validateUser('test@example.com', 'wrongPassword')
      ).rejects.toThrowError(ErrorHttpException);
    });
  });

  describe('login', () => {
    it('should return an access token', () => {
      const mockUser: User = { id: 'user-id' } as User;
      const result = authService.login(mockUser);
      expect(result).toEqual({ access_token: 'mockToken' });
    });
  });

  describe('register', () => {
    // it.skip('should create a new user', async () => {
    //   jest.spyOn(usersService, 'findUserByEmail').mockResolvedValue(null);
    //   jest.spyOn(usersService, 'createUser').mockResolvedValue(undefined);
    //   jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword');

    //   await expect(
    //     authService.register({
    //       name: 'John',
    //       email: 'test@example.com',
    //       password: 'password',
    //     })
    //   ).resolves.not.toThrow();
    // });

    it('should throw an error if user already exists', async () => {
      jest
        .spyOn(usersService, 'findUserByEmail')
        .mockResolvedValue({ id: 'user-id' } as User);

      await expect(
        authService.register({
          name: 'John',
          email: 'test@example.com',
          password: 'password',
        })
      ).rejects.toThrowError(ErrorHttpException);
    });
  });
});
