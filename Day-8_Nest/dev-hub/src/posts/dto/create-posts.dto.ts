import { IsNotEmpty } from 'class-validator';

export class CreatePostsDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
