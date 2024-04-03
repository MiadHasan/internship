import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Comments, CommentsSchema } from 'src/schemas/comments.schema';
import { PostCommentService } from 'src/post-comment/post-comment.service';
import {
  PostComment,
  PostCommentSchema,
} from 'src/schemas/post-comment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Comments.name, schema: CommentsSchema },
      { name: PostComment.name, schema: PostCommentSchema },
    ]),
  ],
  controllers: [CommentsController],
  providers: [CommentsService, PostCommentService],
})
export class CommentsModule {}
