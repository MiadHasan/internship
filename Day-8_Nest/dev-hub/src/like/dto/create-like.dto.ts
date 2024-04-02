import { IsEnum, IsNotEmpty } from 'class-validator';
import { LikeStatus } from '../enums/like-status.enum';

export class CreateLikeDto {
  @IsNotEmpty()
  postId: string;

  @IsNotEmpty()
  @IsEnum(LikeStatus)
  action: LikeStatus;
}
