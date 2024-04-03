import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Posts, PostsSchema } from 'src/schemas/posts.schema';
import { AuthModule } from '../auth/auth.module';
import { UserPost, UserPostSchema } from 'src/schemas/user-post.schema';
import { UserPostService } from 'src/user-post/user-post.service';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Posts.name, schema: PostsSchema },
      { name: UserPost.name, schema: UserPostSchema },
    ]),
    AuthModule,
  ],
  controllers: [PostsController],
  providers: [PostsService, UserPostService],
})
export class PostsModule {}
