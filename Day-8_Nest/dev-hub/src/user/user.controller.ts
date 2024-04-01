import { Body, Controller, Patch, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUsersDto } from './dto/update-users.dto';
import { Request } from 'express';
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Patch()
  updateUser(@Body() requestedUpdate: UpdateUsersDto, @Req() req: Request) {
    return this.userService.updateUser(requestedUpdate, req.user['userId']);
  }
}
