import { Test } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { getModelToken } from '@nestjs/mongoose';
import { Posts } from '../schemas/posts.schema';
import { Model, Types } from 'mongoose';
import { CreatePostsDto } from './dto/create-posts.dto';
import { UserPostService } from '../user-post/user-post.service';

describe('PostsService', () => {
  let postsService: PostsService;
  let postsModel: Model<Posts>;
  let userPostService: UserPostService;
  const mockPostsRepository = {
    create: jest.fn(),
    find: jest.fn(),
  };
  const mockUserPostService = {
    createUserPost: jest.fn(),
  };
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: getModelToken(Posts.name),
          useValue: mockPostsRepository,
        },
        {
          provide: UserPostService,
          useValue: mockUserPostService,
        },
      ],
    }).compile();
    postsService = module.get<PostsService>(PostsService);
    postsModel = module.get<Model<Posts>>(getModelToken(Posts.name));
    userPostService = module.get<UserPostService>(UserPostService);
  });

  const mockPost: any = {
    _id: new Types.ObjectId('66088e106d65d2f9897de46b'),
    title: 'Jest',
    description: 'A framework for test',
    __v: 0,
  };

  const createPostsDto: CreatePostsDto = {
    title: 'Jest',
    description: 'A framework for test',
  };

  const userId = new Types.ObjectId('66088e106d65d2f9897de46b');

  describe('createPost', () => {
    it('should create a post', async () => {
      jest.spyOn(postsModel, 'create').mockResolvedValueOnce(mockPost);
      const result = await postsService.createPost(createPostsDto, userId);
      expect(result).toEqual(mockPost);
    });
  });

  describe('getPosts', () => {
    it('should return all the posts', async () => {
      jest.spyOn(postsModel, 'find').mockImplementationOnce(
        () =>
          ({
            lean: jest.fn().mockResolvedValueOnce([mockPost]),
          }) as any,
      );
      const result = await postsService.getPosts();
      expect(result).toEqual([mockPost]);
    });
  });
});
