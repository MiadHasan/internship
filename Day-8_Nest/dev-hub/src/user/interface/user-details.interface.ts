import { Types } from 'mongoose';

export interface PublicUserDetails {
  username: string;
  _id: Types.ObjectId;
  skills: string[];
  experience: number;
}
