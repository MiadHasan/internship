import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { LikeService } from './like.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { GetCurrentUserId } from 'src/common/decorators/get-user-id.decorator';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';

@Controller('like')
export class LikeController {
  constructor(private likeService: LikeService) {}

  @UseGuards(AccessTokenGuard)
  @Post('post')
  likePost(
    @Body() createLikeDto: CreateLikeDto,
    @GetCurrentUserId() userId: string,
  ): Promise<void> {
    return this.likeService.likePost(userId, createLikeDto);
  }

  //@UseGuards(AccessTokenGuard)
  @Get()
  likeCount(@Query('postId') postId: string): Promise<number> {
    return this.likeService.likeCount(postId);
  }
}
