import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Users } from './users.schema';
import { Posts } from './posts.schema';
import { LikeStatus } from '../like/enums/like-status.enum';
import mongoose from 'mongoose';

@Schema()
export class Like {
  @Prop()
  action: LikeStatus;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Users' })
  userId: Users;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Posts' })
  postId: Posts;
}

export const LikeSchema = SchemaFactory.createForClass(Like);
