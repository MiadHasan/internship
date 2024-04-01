import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Posts, PostsSchema } from 'src/schemas/posts.schema';
import { AuthModule } from '../auth/auth.module';
import { UserPost, UserPostSchema } from 'src/schemas/user-post.schema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Posts.name, schema: PostsSchema }]),
    MongooseModule.forFeature([
      { name: UserPost.name, schema: UserPostSchema },
    ]),
    AuthModule,
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
