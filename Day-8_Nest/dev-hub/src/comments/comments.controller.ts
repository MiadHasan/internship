import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentsDto } from './dto/create-comments.dto';
import { Comments } from 'src/schemas/comments.schema';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Get()
  getComments(@Query('postId') postId: string): Promise<Comments[]> {
    return this.commentsService.getComments(postId);
  }

  @Post()
  createComment(
    @Body() createCommentsDto: CreateCommentsDto,
  ): Promise<Comments> {
    return this.commentsService.createComment(createCommentsDto);
  }
}
