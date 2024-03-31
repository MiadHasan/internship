import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comments } from 'src/schemas/comments.schema';
import { CreateCommentsDto } from './dto/create-comments.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comments.name) private commentsModel: Model<Comments>,
  ) {}

  async getComments(): Promise<Comments[]> {
    return await this.commentsModel.find();
  }

  async createComment(createCommentsDto: CreateCommentsDto): Promise<Comments> {
    const newComment = new this.commentsModel(createCommentsDto);
    return await newComment.save();
  }
}
