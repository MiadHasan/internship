import { Module } from '@nestjs/common';
import { UserPostService } from './user-post.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserPost, UserPostSchema } from 'src/schemas/user-post.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserPost.name, schema: UserPostSchema },
    ]),
  ],
  providers: [UserPostService],
})
export class UserPostModule {}
