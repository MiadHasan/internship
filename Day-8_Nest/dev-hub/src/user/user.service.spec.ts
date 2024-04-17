import { Test } from '@nestjs/testing';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/mongoose';
import { Users } from '../schemas/users.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

describe('user', () => {
  let userService: UserService;
  let userModel: Model<Users>;
  const mockUserRepository = {
    findByIdAndUpdate: jest.fn(),
    findById: jest.fn(),
  };
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(Users.name),
          useValue: mockUserRepository,
        },
      ],
    }).compile();
    userService = module.get<UserService>(UserService);
    userModel = module.get<Model<Users>>(getModelToken(Users.name));
  });
  let mockUser: any = {
    _id: '66088e106d65d2f9897de46b',
    username: 'miad',
    password: '123',
    skills: ['js', 'jest'],
    experience: 1,
    refreshToken: 'refresh_token',
    __v: 0,
  };
  const mockRequestedUpdate = {
    skills: ['js', 'jest'],
    experience: 1,
    password: 'abc',
  };
  const userId = '66088e106d65d2f9897de46b';
  describe('updateUser', () => {
    it('should update a user', async () => {
      jest
        .spyOn(userModel, 'findByIdAndUpdate')
        .mockResolvedValueOnce(mockUser);
      jest.spyOn(userModel, 'findById').mockResolvedValueOnce(mockUser);
      jest
        .spyOn(bcrypt, 'compare')
        .mockImplementation(() => Promise.resolve(false));
      jest
        .spyOn(bcrypt, 'genSalt')
        .mockImplementation(() => Promise.resolve(10));
      jest
        .spyOn(bcrypt, 'hash')
        .mockImplementation(() => Promise.resolve('123'));
      const result = await userService.updateUser(mockRequestedUpdate, userId);
      expect(result).toEqual(mockUser);
    });
  });
});
