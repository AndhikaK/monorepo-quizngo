import { Repository } from 'typeorm';

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { FilesService } from '../files/files.service';

import { User } from './entities/users.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;
  let fileService: FilesService;

  beforeEach(async () => {
    const mockUserRepository = {
      findOneBy: jest.fn(),
      find: jest.fn(),
      insert: jest.fn(),
      update: jest.fn(),
    };

    const mockFileService = {
      upload: jest.fn().mockResolvedValue('some/path/to/file.jpg'), // Mock file upload path
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: mockUserRepository },
        { provide: FilesService, useValue: mockFileService },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
    fileService = module.get<FilesService>(FilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUserById', () => {
    it('should return a user when found', async () => {
      const mockUser = {
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
      };
      repository.findOneBy = jest.fn().mockResolvedValue(mockUser);

      const result = await service.getUserById('1');
      expect(result).toEqual(mockUser);
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: '1' });
    });

    it('should throw an error if the user is not found', async () => {
      repository.findOneBy = jest.fn().mockResolvedValue(null);

      try {
        await service.getUserById('1');
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.message).toBe('User not found');
      }
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const mockUsers = [
        { id: '1', name: 'Test User 1', email: 'test1@example.com' },
        { id: '2', name: 'Test User 2', email: 'test2@example.com' },
      ];
      repository.find = jest.fn().mockResolvedValue(mockUsers);

      const result = await service.findAll();
      expect(result).toEqual(mockUsers);
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('findUserByEmail', () => {
    it('should return a user based on email', async () => {
      const mockUser = {
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
      };
      repository.findOne = jest.fn().mockResolvedValue(mockUser);

      const result = await service.findUserByEmail('test@example.com');
      expect(result).toEqual(mockUser);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
        relations: ['preferences'],
      });
    });

    it('should throw an error if no user is found by email', async () => {
      repository.findOne = jest.fn().mockResolvedValue(null);

      try {
        await service.findUserByEmail('nonexistent@example.com');
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.message).toBe('User not found');
      }
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const mockUser = {
        name: 'New User',
        email: 'newuser@example.com',
        password: 'password',
      };
      repository.insert = jest
        .fn()
        .mockResolvedValue({ identifiers: [{ id: '1' }] });

      const result = await service.createUser(mockUser);
      expect(result).toEqual({ identifiers: [{ id: '1' }] });
      expect(repository.insert).toHaveBeenCalledWith(mockUser);
    });
  });

  describe('patchCurrentUser', () => {
    it('should update the user and upload a file', async () => {
      const mockUser = {
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
      };
      const mockUpdatePayload = { name: 'Updated Name' };
      const fileBuffer = Buffer.from('file content'); // Mock file content

      await service.patchCurrentUser(
        mockUser as User,
        fileBuffer,
        mockUpdatePayload
      );

      expect(fileService.upload).toHaveBeenCalledWith(
        fileBuffer,
        mockUser.id,
        'display-pictures'
      );
      expect(repository.update).toHaveBeenCalledWith(
        { id: mockUser.id },
        expect.objectContaining({ name: 'Updated Name' })
      );
    });
  });
});
