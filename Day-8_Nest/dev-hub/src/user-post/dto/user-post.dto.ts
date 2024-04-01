import mongoose from 'mongoose';

export class UserPostDto {
  userId: mongoose.Types.ObjectId;
  postId: mongoose.Types.ObjectId;
}
