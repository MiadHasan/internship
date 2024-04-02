import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Like } from 'src/schemas/like.schema';
import { CreateLikeDto } from './dto/create-like.dto';

@Injectable()
export class LikeService {
  constructor(@InjectModel(Like.name) private likeModel: Model<Like>) {}

  async likePost(userId: string, createLikeDto: CreateLikeDto) {
    const likeObj = {
      userId,
      ...createLikeDto,
    };
    const newLikeDoc = new this.likeModel(likeObj);
    await newLikeDoc.save();
  }
}
