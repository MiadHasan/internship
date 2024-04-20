import { IsArray, IsOptional, IsPositive, IsString } from 'class-validator';

export class UpdateUsersDto {
  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsArray()
  skills?: string[];

  @IsOptional()
  @IsPositive()
  experience?: number;
}
