import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostComment } from 'src/schemas/post-comment.schema';
import { PostCommentDto } from './dto/post-comment.dto';
import { Types } from 'mongoose';

@Injectable()
export class PostCommentService {
  constructor(
    @InjectModel(PostComment.name) private postCommentModel: Model<PostComment>,
  ) {}

  async createPostComment(postCommentDto: PostCommentDto) {
    await this.postCommentModel.create(postCommentDto);
  }

  // async getComments(postId: string): Promise<{ comment: string }[]> {
  //   const aggregate = [];
  //   aggregate.push({ $match: { postId: new Types.ObjectId(postId) } });
  //   aggregate.push({
  //     $lookup: {
  //       from: 'comments',
  //       localField: 'commentId',
  //       foreignField: '_id',
  //       as: 'comments on post',
  //     },
  //   });
  //   aggregate.push({ $unwind: '$comments on post' });
  //   aggregate.push({
  //     $project: { comment: '$comments on post.comment', _id: 0 },
  //   });
  //   const comments = await this.postCommentModel.aggregate(aggregate);
  //   console.log(comments);
  //   return comments;
  // }

  async getComments(postId: string): Promise<PostComment[]> {
    return await this.postCommentModel.find({
      postId: new Types.ObjectId(postId),
    });
  }
}
