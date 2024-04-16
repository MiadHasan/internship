import { Test } from '@nestjs/testing';
import { CommentsService } from './comments.service';
import { PostCommentService } from '../post-comment/post-comment.service';
import { getModelToken } from '@nestjs/mongoose';
import { Comments } from '../schemas/comments.schema';
import mongoose, { Model } from 'mongoose';
import { CreateCommentsDto } from './dto/create-comments.dto';
import { PostComment } from 'src/schemas/post-comment.schema';

describe('CommentsService', () => {
  let commentsService: CommentsService;
  let commentsModel: Model<Comments>;
  let postCommentService: PostCommentService;
  const mockCommentsRepository = {
    create: jest.fn(),
    find: jest.fn(),
  };

  const mockPostCommentService = {
    createPostComment: jest.fn(),
    getComments: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CommentsService,
        {
          provide: getModelToken(Comments.name),
          useValue: mockCommentsRepository,
        },
        {
          provide: PostCommentService,
          useValue: mockPostCommentService,
        },
      ],
    }).compile();

    commentsService = module.get<CommentsService>(CommentsService);
    commentsModel = module.get<Model<Comments>>(getModelToken(Comments.name));
    postCommentService = module.get<PostCommentService>(PostCommentService);
  });
  const mockComment: any = {
    comment: 'hello',
    _id: '66088e106d65d2f9897de46b',
    __v: 0,
  };
  const newComment = {
    comment: 'hello',
  };
  const mockPostComments: PostComment[] = [
    {
      postId: new mongoose.Schema.Types.ObjectId('66088e106d65d2f9897de46b'),
      commentId: new mongoose.Schema.Types.ObjectId('66088e106d65d2f9897de46b'),
    },
  ];
  const mockCommentIds = [
    new mongoose.Schema.Types.ObjectId('66088e106d65d2f9897de46b'),
  ];
  const postId = '66088e106d65d2f9897de46b';
  describe('createComment', () => {
    it('should create and return a comment', async () => {
      jest.spyOn(commentsModel, 'create').mockResolvedValueOnce(mockComment);

      const result = await commentsService.createComment(
        newComment as CreateCommentsDto,
        postId,
      );
      expect(result).toEqual(mockComment);
    });
  });

  describe('getComments', () => {
    it('should return the comments of a post', async () => {
      jest.spyOn(commentsModel, 'find').mockResolvedValueOnce([mockComment]);
      jest
        .spyOn(postCommentService, 'getComments')
        .mockResolvedValueOnce(mockPostComments);
      const result = await commentsService.getComments(postId);
      expect(commentsModel.find).toHaveBeenCalledWith({
        _id: { $in: mockCommentIds },
      });
      expect(result).toEqual([mockComment]);
    });

    it('should throw an error if invalid post id', async () => {
      jest.spyOn(commentsModel, 'find').mockResolvedValueOnce([mockComment]);

      await expect(commentsService.getComments('invalid')).rejects.toThrow(
        'Invalid Post ID',
      );
    });
  });
});
