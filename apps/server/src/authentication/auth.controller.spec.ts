import { Test, TestingModule } from '@nestjs/testing';

import { User } from '@/client/users/entities/users.entity';

import { RegisterDto } from './dto/register.dto';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let app: TestingModule;
  let authController: AuthController;
  let authService: AuthService;

  const mockUser = {
    id: 'testid',
    name: 'test',
    email: 'test@gmail.com',
    password: 'password',
    createdAt: new Date('2022-12-99'),
    updatedAt: new Date('2022-12-99'),
    display_picture_url: '',
  } as User;

  beforeEach(async () => {
    const mockAuthService = {
      login: jest.fn().mockResolvedValue({ accessToken: 'mock_token' }),
      register: jest.fn().mockResolvedValue(undefined),
    };

    app = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    authController = app.get<AuthController>(AuthController);
    authService = app.get<AuthService>(AuthService);
  });

  describe('login', () => {
    it('should be defined', () => {
      expect(authController).toBeDefined();
    });

    it('should login and return a token', async () => {
      const mockRequest = {
        user: mockUser,
      } as Request & { user: User };
      const result = await authController.login(mockRequest);
      expect(result).toEqual({ accessToken: 'mock_token' });
      expect(authService.login).toHaveBeenCalledWith(mockRequest.user);
    });

    it('should register a user', async () => {
      const registerDto: RegisterDto = {
        name: 'test',
        email: 'test@gmail.com',
        password: 'pass123',
      };
      const result = await authController.register(registerDto);

      expect(result).toEqual({ message: 'User Created' });
      expect(authService.register).toHaveBeenCalledWith(registerDto);
    });
  });
});
