import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostsDto } from './dto/create-posts.dto';
import { Posts } from 'src/schemas/posts.schema';
import { AuthGuard } from '@nestjs/passport';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  getPosts(): Promise<Posts[]> {
    return this.postsService.getPosts();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  createPost(@Body() createPostsDto: CreatePostsDto): Promise<Posts> {
    return this.postsService.createPost(createPostsDto);
  }
}
