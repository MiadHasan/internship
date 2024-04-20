import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { Comments } from '../schemas/comments.schema';
import { CreateCommentsDto } from './dto/create-comments.dto';
import { PostCommentService } from '../post-comment/post-comment.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comments.name) private commentsModel: Model<Comments>,
    private postCommentService: PostCommentService,
  ) {}

  async getComments(postId: string): Promise<Comments[]> {
    if (!Types.ObjectId.isValid(postId)) {
      throw new NotFoundException('No post!');
    }
    const postComments = await this.postCommentService.getComments(postId);
    const commentIds = postComments?.map((item) => item.commentId);
    return await this.commentsModel.find({ _id: { $in: commentIds } });
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

  async updateComment() {}

  async deleteComment() {}

  async getCommentById() {}
}
