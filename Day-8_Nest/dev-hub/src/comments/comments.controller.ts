import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentsDto } from './dto/create-comments.dto';
import { Comments } from 'src/schemas/comments.schema';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Get(':postId/list')
  getComments(@Param('postId') postId: string): Promise<Comments[]> {
    return this.commentsService.getComments(postId);
  }

  @Post(':postId/comment')
  createComment(
    @Param('postId') postId: string,
    @Body() createCommentsDto: CreateCommentsDto,
  ): Promise<Comments> {
    return this.commentsService.createComment(createCommentsDto, postId);
  }

  @Put()
  updateComment() {
    return this.commentsService.updateComment();
  }

  @Delete()
  deleteComment() {
    return this.commentsService.deleteComment();
  }

  getCommentById() {
    return this.commentsService.getCommentById();
  }
}
