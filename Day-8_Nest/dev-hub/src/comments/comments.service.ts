import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Comments } from 'src/schemas/comments.schema';
import { CreateCommentsDto } from './dto/create-comments.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comments.name) private commentsModel: Model<Comments>,
  ) {}

  async getComments(postId: string): Promise<Comments[]> {
    if (!Types.ObjectId.isValid(postId)) {
      throw new NotFoundException('No post!');
    }
    //const postComments =
    return await this.commentsModel.find();
  }

  async createComment(createCommentsDto: CreateCommentsDto): Promise<Comments> {
    const newComment = new this.commentsModel(createCommentsDto);
    return await newComment.save();
  }
}
