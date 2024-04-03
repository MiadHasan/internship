import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from 'src/schemas/users.schema';
import { RefreshTokenGuard } from 'src/common/guards/refresh-token.guard';
import { GetCurrentUserId } from 'src/common/decorators/get-user-id.decorator';
import { GetCurrentUser } from 'src/common/decorators/get-user.decorator';
import { Tokens } from './interfaces/tokens.interface';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signup')
  signUp(@Body() createUserDto: CreateUserDto): Promise<Users> {
    return this.authService.signUp(createUserDto);
  }

  @Public()
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() createUserDto: CreateUserDto): Promise<Tokens> {
    return this.authService.signIn(createUserDto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUserId() userId: string): Promise<void> {
    return this.authService.logout(userId);
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @GetCurrentUserId() userId: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<Tokens> {
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
