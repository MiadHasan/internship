import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { Model } from 'mongoose';
import { Users } from '../schemas/users.schema';
import { AuthService } from './auth.service';
import { getModelToken } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { Mock } from 'node:test';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

describe('AuthService', () => {
  let usersModel: Model<Users>;
  let authService: AuthService;
  let jwtService: JwtService;
  let configService: ConfigService;

  const mockJwtService = {
    signAsync: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn(),
  };

  const mockUsersRepository = {
    findOne: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
        {
          provide: getModelToken(Users.name),
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersModel = module.get<Model<Users>>(getModelToken(Users.name));
    jwtService = module.get<JwtService>(JwtService);
    configService = module.get<ConfigService>(ConfigService);
  });

  let mockUserCredential = {
    username: 'miad',
    password: '123',
  };

  const mockUserId = '66088e106d65d2f9897de46b';

  let mockUser: any = {
    _id: '66088e106d65d2f9897de46b',
    username: 'miad',
    password: '123',
    skills: [],
    experience: 0,
    refreshToken: 'refresh_token',
    __v: 0,
  };

  const mockTokens = {
    accessToken: 'access_token',
    refreshToken: 'refresh_token',
  };

  describe('signIn', () => {
    it('should sign in a user', async () => {
      mockFunctionsForSignIn(
        jwtService,
        configService,
        usersModel,
        mockUser,
        true,
      );
      const result = await authService.signIn(
        mockUserCredential as CreateUserDto,
      );
      expect(result).toEqual(mockTokens);
    });

    it('should throw unauthorized exception', async () => {
      mockFunctionsForSignIn(
        jwtService,
        configService,
        usersModel,
        mockUser,
        false,
      );
      await expect(
        authService.signIn(mockUserCredential as CreateUserDto),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw unauthorized exception', async () => {
      mockUser = undefined;
      mockFunctionsForSignIn(
        jwtService,
        configService,
        usersModel,
        mockUser,
        true,
      );
      await expect(
        authService.signIn(mockUserCredential as CreateUserDto),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('signUp', () => {
    it('should sign up a user', async () => {
      jest
        .spyOn(bcrypt, 'genSalt')
        .mockImplementationOnce(() => Promise.resolve(10));
      jest
        .spyOn(bcrypt, 'hash')
        .mockImplementationOnce(() => Promise.resolve('123'));
      // const user = {
      //   username: mockUserCredential.username,
      //   password: mockUserCredential.password,
      //   skills: [],
      //   experience: 0,
      // };
      // const newUser = new usersModel(user);
      jest.spyOn(usersModel, 'create').mockResolvedValueOnce(mockUser);

      const result = await authService.signUp(
        mockUserCredential as CreateUserDto,
      );
      expect(result).toEqual(mockUser);
    });
  });

  describe('logout', () => {
    it('should logout a user', async () => {
      jest
        .spyOn(usersModel, 'findByIdAndUpdate')
        .mockResolvedValueOnce(mockUser);
      const result = await authService.logout(mockUserId);
      expect(result).toEqual(mockUser);
    });
  });
});

function mockFunctionsForSignIn(
  jwtService: JwtService,
  configService: ConfigService<Record<string, unknown>, false>,
  usersModel: Model<
    Users,
    {},
    {},
    {},
    import('mongoose').Document<unknown, {}, Users> &
      Users & { _id: import('mongoose').Types.ObjectId },
    any
  >,
  mockUser: {
    _id: string;
    username: string;
    password: string;
    skills: string[];
    experience: number;
    refreshToken: string;
    __v: number;
  },
  isMatch: boolean,
) {
  jest
    .spyOn(jwtService, 'signAsync')
    .mockResolvedValueOnce('access_token')
    .mockResolvedValueOnce('refresh_token');
  jest.spyOn(configService, 'get').mockReturnValueOnce('secret');
  jest.spyOn(usersModel, 'findOne').mockResolvedValueOnce(mockUser);
  jest
    .spyOn(bcrypt, 'compare')
    .mockImplementationOnce(() => Promise.resolve(isMatch));
}
