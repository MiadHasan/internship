import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Posts } from 'src/schemas/posts.schema';
import { CreatePostsDto } from './dto/create-posts.dto';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Posts.name) private postsModel: Model<Posts>) {}

  async getPosts(): Promise<Posts[]> {
    return this.postsModel.find().exec();
  }

  async createPost(createPostsDto: CreatePostsDto): Promise<Posts> {
    console.log(createPostsDto);
    const newPost = new this.postsModel(createPostsDto);
    return newPost.save();
  }
}
