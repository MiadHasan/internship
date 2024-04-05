import { Test } from '@nestjs/testing';
import { CommentsService } from './comments.service';
import { PostCommentService } from '../post-comment/post-comment.service';
import { getModelToken } from '@nestjs/mongoose';
import { Comments } from '../schemas/comments.schema';

describe('CommentsService', () => {
  let commentsService: CommentsService;

  const mockCommentsRepository = {
    create: jest.fn().mockImplementation((createCommentsDto) =>
      Promise.resolve({
        comment: createCommentsDto.comment,
        _id: '66088e106d65d2f9897de46b',
      }),
    ),
  };

  const mockPostCommentService = {
    createPostComment: jest
      .fn()
      .mockImplementation((postComment) =>
        Promise.resolve({ ...postComment, _id: '66088e106d65d2f9897de46b' }),
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
        {
          provide: PostCommentService,
          useValue: mockPostCommentService,
        },
      ],
    }).compile();

    commentsService = module.get<CommentsService>(CommentsService);
  });
  const expectedResult = {
    comment: 'hello',
    _id: '66088e106d65d2f9897de46b',
  };
  it('should create a comment', async () => {
    const result = await commentsService.createComment(
      { comment: 'hello' },
      '66088e106d65d2f9897de46b',
    );
    // jest
    //   .spyOn(postCommentService, 'createPostComment')
    //   .mockImplementation(() => Promise.resolve());
    expect(result).toEqual(expectedResult);
  });
});
