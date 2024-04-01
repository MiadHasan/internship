import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Posts } from 'src/schemas/posts.schema';
import { CreatePostsDto } from './dto/create-posts.dto';
import { UserPost } from 'src/schemas/user-post.schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Posts.name) private postsModel: Model<Posts>,
    @InjectModel(UserPost.name) private userPostModel: Model<UserPost>,
  ) {}

  async getPosts(): Promise<Posts[]> {
    return await this.postsModel.find().exec();
  }

  async createPost(
    createPostsDto: CreatePostsDto,
    userId: mongoose.Types.ObjectId,
  ): Promise<Posts> {
    const createdPost = await this.postsModel.create(createPostsDto);
    const userPost = {
      userId: new mongoose.Types.ObjectId(userId),
      postId: createdPost._id,
    };
    await this.userPostModel.create(userPost);
    return createdPost;
  }
}
