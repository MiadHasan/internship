import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Like } from '../schemas/like.schema';
import { CreateLikeDto } from './dto/create-like.dto';
import { LikeStatus } from './enums/like-status.enum';
import { LikeOrDislikeCountQueryDto } from './dto/like-count-query.dto';

@Injectable()
export class LikeService {
  constructor(@InjectModel(Like.name) private likeModel: Model<Like>) {}

  //creating a doc associated with like or dislike
  async likePost(userId: string, createLikeDto: CreateLikeDto) {
    if (!Types.ObjectId.isValid(createLikeDto.postId)) {
      throw new ForbiddenException('Invalid post id!');
    }
    if (!Types.ObjectId.isValid(userId)) {
      throw new ForbiddenException('Invalid user id!');
    }
    const likeObj = {
      userId,
      postId: createLikeDto.postId,
      action: createLikeDto.action,
    };
    return await this.likeModel.create(likeObj);
  }

  //return the like or dislike count for a specific post
  async likeOrDislikeCount(
    likeOrDislikeCountQueryDto: LikeOrDislikeCountQueryDto,
  ): Promise<number | undefined> {
    if (!Types.ObjectId.isValid(likeOrDislikeCountQueryDto.postId)) {
      throw new ForbiddenException('Invalid post id!');
    }
    likeOrDislikeCountQueryDto.action =
      likeOrDislikeCountQueryDto.action ?? LikeStatus.LIKE;
    const aggregate = [];
    aggregate.push({
      $match: {
        postId: new Types.ObjectId(likeOrDislikeCountQueryDto.postId),
        action: likeOrDislikeCountQueryDto.action,
      },
    });
    aggregate.push({ $count: 'like' });

    const count = await this.likeModel.aggregate(aggregate).exec();
    console.log(count);
    return count.length > 0 ? count[0]?.like : 0;
  }

  async deleteLike(likeId: string) {
    return await this.likeModel.findByIdAndDelete(likeId);
  }
}
