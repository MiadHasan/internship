import { IsNotEmpty } from 'class-validator';

export class CreateCommentsDto {
  @IsNotEmpty()
  comment: string;
}
