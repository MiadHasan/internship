import { Test } from '@nestjs/testing';
import { LikeService } from './like.service';
import { Model, Types } from 'mongoose';
import { Like } from '../schemas/like.schema';
import { getModelToken } from '@nestjs/mongoose';
import { CreateLikeDto } from './dto/create-like.dto';
import { LikeStatus } from './enums/like-status.enum';
import { ForbiddenException } from '@nestjs/common';
import { exec } from 'child_process';
import { LikeOrDislikeCountQueryDto } from './dto/like-count-query.dto';

describe('likeService', () => {
  let likeService: LikeService;
  let likeModel: Model<Like>;

  const mockLikeRepository = {
    create: jest.fn(),
    aggregate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        LikeService,
        {
          provide: getModelToken(Like.name),
          useValue: mockLikeRepository,
        },
      ],
    }).compile();
    likeService = module.get<LikeService>(LikeService);
    likeModel = module.get<Model<Like>>(getModelToken(Like.name));
  });

  const mockCreateLikeDto: CreateLikeDto = {
    postId: '66088e106d65d2f9897de46b',
    action: LikeStatus.LIKE,
  };

  const userId = '66088e106d65d2f9897de46b';

  const mockLikeObj: any = {
    _id: new Types.ObjectId('66088e106d65d2f9897de46b'),
    userId,
    postId: mockCreateLikeDto.postId,
    action: mockCreateLikeDto.action,
    __v: 0,
  };

  describe('likePost', () => {
    it('should create a new like doc', async () => {
      jest.spyOn(likeModel, 'create').mockResolvedValueOnce(mockLikeObj);
      const result = await likeService.likePost(userId, mockCreateLikeDto);
      expect(result).toEqual(mockLikeObj);
    });

    it('should throw Forbidden exception for invalid post id', async () => {
      await expect(
        likeService.likePost(userId, {
          postId: 'abc',
          action: LikeStatus.DISLIKE,
        }),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should throw Forbidden exception for invalid user id', async () => {
      await expect(
        likeService.likePost('invalid', mockCreateLikeDto),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('likeOrDislikeCount', () => {
    it('should count the reaction', async () => {
      jest.spyOn(likeModel, 'aggregate').mockImplementationOnce(
        () =>
          ({
            exec: jest.fn().mockResolvedValueOnce([{ like: 10 }]),
          }) as any,
      );
      const result = await likeService.likeOrDislikeCount(mockCreateLikeDto);
      expect(result).toEqual(10);
    });

    it('should throw Forbidden exception for invalid post id', async () => {
      await expect(
        likeService.likeOrDislikeCount({
          postId: 'abc',
          action: LikeStatus.DISLIKE,
        }),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should return 0', async () => {
      jest.spyOn(likeModel, 'aggregate').mockImplementationOnce(
        () =>
          ({
            exec: jest.fn().mockResolvedValueOnce([]),
          }) as any,
      );
      const result = await likeService.likeOrDislikeCount(mockCreateLikeDto);
      expect(result).toEqual(0);
    });

    it('should count the reaction', async () => {
      jest.spyOn(likeModel, 'aggregate').mockImplementationOnce(
        () =>
          ({
            exec: jest.fn().mockResolvedValueOnce([{ like: 10 }]),
          }) as any,
      );
      const result = await likeService.likeOrDislikeCount({
        postId: '66088e106d65d2f9897de46b',
      } as LikeOrDislikeCountQueryDto);
      expect(result).toEqual(10);
    });
  });

  describe('deleteLike', () => {
    it('should delete like', async () => {
      jest
        .spyOn(likeModel, 'findByIdAndDelete')
        .mockResolvedValueOnce(mockLikeObj);
      const result = await likeService.deleteLike('66088e106d65d2f9897de46b');
      expect(result).toEqual(mockLikeObj);
    });
  });
});
