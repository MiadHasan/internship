import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Comments } from 'src/schemas/comments.schema';
import { CreateCommentsDto } from './dto/create-comments.dto';
import { PostCommentService } from 'src/post-comment/post-comment.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comments.name) private commentsModel: Model<Comments>,
    private postCommentService: PostCommentService,
  ) {}

  async getComments(): Promise<Comments[]> {
    return await this.commentsModel.find();
  }

  async createComment(
    createCommentsDto: CreateCommentsDto,
    postId: string,
  ): Promise<Comments> {
    const newComment = await this.commentsModel.create(createCommentsDto);
    const postComment = {
      postId: new mongoose.Types.ObjectId(postId),
      commentId: newComment._id,
    };
    await this.postCommentService.createPostComment(postComment);
    return newComment;
  }
}
