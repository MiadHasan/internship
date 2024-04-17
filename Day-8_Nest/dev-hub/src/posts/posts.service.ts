import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Posts } from '../schemas/posts.schema';
import { CreatePostsDto } from './dto/create-posts.dto';
import { UserPostService } from '../user-post/user-post.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Posts.name) private postsModel: Model<Posts>,
    private userPostService: UserPostService,
  ) {}

  async getPosts(): Promise<Posts[]> {
    return await this.postsModel.find().lean();
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
    this.userPostService.createUserPost(userPost);
    return createdPost;
  }
}
