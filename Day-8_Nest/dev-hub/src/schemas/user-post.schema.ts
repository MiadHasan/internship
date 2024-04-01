import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Users } from './users.schema';
import { Posts } from './posts.schema';

@Schema()
export class UserPost {
  @Prop({ type: mongoose.Types.ObjectId, ref: 'Users' })
  userId: Users;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'Posts' })
  postId: Posts;
}

export const UserPostSchema = SchemaFactory.createForClass(UserPost);
