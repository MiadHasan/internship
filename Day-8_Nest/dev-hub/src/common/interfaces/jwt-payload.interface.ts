import mongoose from 'mongoose';

export interface jwtPayload {
  username: string;
  userId: mongoose.Types.ObjectId | string;
}
