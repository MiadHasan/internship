import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from 'src/schemas/users.schema';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(@Body() createUserDto: CreateUserDto): Promise<Users> {
    return this.authService.signUp(createUserDto);
  }

  @Post('signin')
  signIn(@Body() createUserDto: CreateUserDto) {
    return this.authService.signIn(createUserDto);
  }
}
