import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { LikeService } from './like.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { GetCurrentUserId } from 'src/common/decorators/get-user-id.decorator';
import { LikeOrDislikeCountQueryDto } from './dto/like-count-query.dto';

@Controller('like')
export class LikeController {
  constructor(private likeService: LikeService) {}

  @Post('post')
  likePost(
    @Body() createLikeDto: CreateLikeDto,
    @GetCurrentUserId() userId: string,
  ): Promise<void> {
    return this.likeService.likePost(userId, createLikeDto);
  }

  @Get(':postId/count')
  likeOrDislikeCount(
    @Query() likeOrDislikeCountQueryDto: LikeOrDislikeCountQueryDto,
  ): Promise<number> {
    return this.likeService.likeOrDislikeCount(likeOrDislikeCountQueryDto);
  }
}
