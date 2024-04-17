import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserPost } from '../schemas/user-post.schema';
import { UserPostDto } from './dto/user-post.dto';

@Injectable()
export class UserPostService {
  constructor(
    @InjectModel(UserPost.name) private readonly userPostModel: Model<UserPost>,
  ) {}

  async createUserPost(userPostDto: UserPostDto) {
    return await this.userPostModel.create(userPostDto);
  }
}
