import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentsDto } from './dto/create-comments.dto';
import { Comments } from 'src/schemas/comments.schema';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Get()
  getComments(): Promise<Comments[]> {
    return this.commentsService.getComments();
  }

  @Post()
  createComment(
    @Body() createCommentsDto: CreateCommentsDto,
  ): Promise<Comments> {
    return this.commentsService.createComment(createCommentsDto);
  }
}
