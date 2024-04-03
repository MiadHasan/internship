import { Body, Controller, Patch, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUsersDto } from './dto/update-users.dto';
import { Request } from 'express';
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Patch()
  updateUser(@Body() requestedUpdate: UpdateUsersDto, @Req() req: Request) {
    return this.userService.updateUser(requestedUpdate, req.user['userId']);
  }
}
