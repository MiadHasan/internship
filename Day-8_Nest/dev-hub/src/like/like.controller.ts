import { Body, Controller, Post, UseGuards } from '@nestjs/common';
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
  ) {
    return this.likeService.likePost(userId, createLikeDto);
  }
}
