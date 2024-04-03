import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Like } from 'src/schemas/like.schema';
import { CreateLikeDto } from './dto/create-like.dto';

@Injectable()
export class LikeService {
  constructor(@InjectModel(Like.name) private likeModel: Model<Like>) {}

  //creating a doc associated with like or dislike
  async likePost(userId: string, createLikeDto: CreateLikeDto) {
    if (!Types.ObjectId.isValid(createLikeDto.postId)) {
      throw new NotFoundException('Not valid post id!');
    }
    const likeObj = {
      userId,
      ...createLikeDto,
    };
    const newLikeDoc = new this.likeModel(likeObj);
    await newLikeDoc.save();
  }

  //return the like count for a specific post
  async likeCount(postId: string): Promise<number | undefined> {
    const aggregate = [];
    aggregate.push({ $match: { postId: new Types.ObjectId(postId) } });
    aggregate.push({ $count: 'like' });

    const count = await this.likeModel.aggregate(aggregate).exec();
    console.log(count);
    return count?.[0]?.like;
  }
}
