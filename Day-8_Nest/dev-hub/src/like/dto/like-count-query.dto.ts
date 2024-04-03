import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { LikeStatus } from '../enums/like-status.enum';

export class LikeOrDislikeCountQueryDto {
  @IsOptional()
  @IsEnum(LikeStatus)
  action: LikeStatus;

  @IsNotEmpty()
  postId: string;
}
