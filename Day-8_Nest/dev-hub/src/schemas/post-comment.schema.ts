import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Posts } from './posts.schema';
import { Comments } from './comments.schema';

@Schema()
export class PostComment {
  @Prop({ type: mongoose.Types.ObjectId, ref: 'Posts' })
  postId: Posts;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'Comments' })
  commentId: Comments;
}

export const PostCommentSchema = SchemaFactory.createForClass(PostComment);
