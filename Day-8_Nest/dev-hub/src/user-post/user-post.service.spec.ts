import { Test } from '@nestjs/testing';
import { UserPostService } from './user-post.service';
import { getModelToken } from '@nestjs/mongoose';
import { UserPost } from '../schemas/user-post.schema';
import { Model, Types } from 'mongoose';
import { UserPostDto } from './dto/user-post.dto';

describe('UserPostService', () => {
  let userPostService: UserPostService;
  let userPostModel: Model<UserPost>;
  const mockUserPostRepository = {
    create: jest.fn(),
  };
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserPostService,
        {
          provide: getModelToken(UserPost.name),
          useValue: mockUserPostRepository,
        },
      ],
    }).compile();
    userPostModel = module.get<Model<UserPost>>(getModelToken(UserPost.name));
    userPostService = module.get<UserPostService>(UserPostService);
  });

  const mockUserPost: any = {
    _id: new Types.ObjectId('66088e106d65d2f9897de46b'),
    userId: '66088e106d65d2f9897de46b',
    postId: '66088e106d65d2f9897de46b',
    __v: 0,
  };

  const userPostDto: UserPostDto = {
    userId: new Types.ObjectId('66088e106d65d2f9897de46b'),
    postId: new Types.ObjectId('66088e106d65d2f9897de46b'),
  };

  describe('createUserPost', () => {
    it('should create a relation with user and post', async () => {
      jest.spyOn(userPostModel, 'create').mockResolvedValueOnce(mockUserPost);
      const result = await userPostService.createUserPost(userPostDto);
      expect(result).toEqual(mockUserPost);
    });
  });
});
