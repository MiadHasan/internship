import { Test } from '@nestjs/testing';
import { CommentsService } from './comments.service';
import { PostCommentService } from '../post-comment/post-comment.service';

describe('CommentsService', () => {
  let commentsService: CommentsService;

  const mockCommentsRepository = {
    createComment: jest.fn((createCommentsDto) => ({
      ...createCommentsDto,
      _id: '123',
    })),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CommentsService,
        {
          provide: CommentsService,
          useValue: mockCommentsRepository,
        },
        PostCommentService,
        { provide: PostCommentService, useValue: {} },
      ],
    }).compile();

    commentsService = module.get<CommentsService>(CommentsService);
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
    expect(result).toEqual(expectedResult);
  });
});
