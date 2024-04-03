import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostComment } from 'src/schemas/post-comment.schema';
import { PostCommentDto } from './dto/post-comment.dto';

@Injectable()
export class PostCommentService {
  constructor(
    @InjectModel(PostComment.name) private postCommentModel: Model<PostComment>,
  ) {}

  async createPostComment(postCommentDto: PostCommentDto) {
    await this.postCommentModel.create(postCommentDto);
  }

  async getComments(postId: string): Promise<PostComment[]> {
    const comments = await this.postCommentModel.find({ postId: postId });
    console.log(comments);
    return comments;
  }
}
