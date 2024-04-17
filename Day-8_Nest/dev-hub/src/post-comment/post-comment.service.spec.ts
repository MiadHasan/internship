import { Test } from '@nestjs/testing';
import { PostCommentService } from './post-comment.service';
import { getModelToken } from '@nestjs/mongoose';
import { PostComment } from '../schemas/post-comment.schema';
import { Model, Types } from 'mongoose';
import { PostCommentDto } from './dto/post-comment.dto';
import { ForbiddenException } from '@nestjs/common';

describe('postCommentService', () => {
  let postCommentModel: Model<PostComment>;
  let postCommentService: PostCommentService;
  const mockPostCommentRepository = {
    create: jest.fn(),
    find: jest.fn(),
  };
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        PostCommentService,
        {
          provide: getModelToken(PostComment.name),
          useValue: mockPostCommentRepository,
        },
      ],
    }).compile();
    postCommentModel = module.get<Model<PostComment>>(
      getModelToken(PostComment.name),
    );
    postCommentService = module.get<PostCommentService>(PostCommentService);
  });

  const mockPostComment: any = {
    _id: new Types.ObjectId('66088e106d65d2f9897de46b'),
    postId: '66088e106d65d2f9897de46b',
    commentId: '66088e106d65d2f9897de46b',
    __v: 0,
  };
  const postCommentDto: PostCommentDto = {
    postId: new Types.ObjectId('66088e106d65d2f9897de46b'),
    commentId: new Types.ObjectId('66088e106d65d2f9897de46b'),
  };
  describe('createPostComment', () => {
    it('should create a relation of post and comment', async () => {
      jest
        .spyOn(postCommentModel, 'create')
        .mockResolvedValueOnce(mockPostComment);
      const result = await postCommentService.createPostComment(postCommentDto);
      expect(result).toEqual(mockPostComment);
    });
  });

  describe('getPostComment', () => {
    it('should return comments of the post', async () => {
      jest
        .spyOn(postCommentModel, 'find')
        .mockResolvedValueOnce([mockPostComment]);
      const result = await postCommentService.getComments(
        '66088e106d65d2f9897de46b',
      );
      expect(result).toEqual([mockPostComment]);
    });

    it('should throw Forbidden exception for invalid post id', async () => {
      await expect(
        postCommentService.getComments('invalid id'),
      ).rejects.toThrow(ForbiddenException);
    });
  });
});
