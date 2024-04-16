import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Posts } from './posts.schema';
import { Comments } from './comments.schema';

@Schema()
export class PostComment {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Posts' })
  postId: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Comments' })
  commentId: mongoose.Schema.Types.ObjectId;
}

export const PostCommentSchema = SchemaFactory.createForClass(PostComment);
