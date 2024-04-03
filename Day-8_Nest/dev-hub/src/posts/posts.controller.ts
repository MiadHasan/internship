import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostsDto } from './dto/create-posts.dto';
import { Posts } from 'src/schemas/posts.schema';
import { Request } from 'express';
@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  getPosts(): Promise<Posts[]> {
    return this.postsService.getPosts();
  }

  @Post()
  createPost(
    @Body() createPostsDto: CreatePostsDto,
    @Req() req: Request,
  ): Promise<Posts> {
    return this.postsService.createPost(createPostsDto, req.user['userId']);
  }
}
