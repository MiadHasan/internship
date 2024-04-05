import { Test } from '@nestjs/testing';
import { CommentsService } from './comments.service';
import { PostCommentService } from '../post-comment/post-comment.service';
import { getModelToken } from '@nestjs/mongoose';
import { Comments } from 'src/schemas/comments.schema';

describe('CommentsService', () => {
  let commentsService: CommentsService;
  let postCommentService: PostCommentService;

  const mockCommentsRepository = {
    create: jest
      .fn()
      .mockImplementation((createCommentsDto) =>
        Promise.resolve({ comment: createCommentsDto.comment, _id: '123' }),
      ),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CommentsService,
        {
          provide: getModelToken(Comments.name),
          useValue: mockCommentsRepository,
        },
        PostCommentService,
      ],
    }).compile();

    commentsService = module.get<CommentsService>(CommentsService);
    postCommentService = module.get<PostCommentService>(PostCommentService);
  });
  const expectedResult = {
    comment: 'hello',
    _id: '123',
  };
  it('should create a comment', async () => {
    const result = await commentsService.createComment(
      { comment: 'hello' },
      '123',
    );
    jest
      .spyOn(postCommentService, 'createPostComment')
      .mockImplementation(() => Promise.resolve());
    expect(result).toEqual(expectedResult);
  });
});
