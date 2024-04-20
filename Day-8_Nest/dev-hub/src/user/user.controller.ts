import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUsersDto } from './dto/update-users.dto';
import { PublicUserDetails } from './interface/user-details.interface';
import { GetCurrentUserId } from 'src/common/decorators/get-user-id.decorator';
import { MongoIdValidationPipe } from 'src/common/pipes/validation-pipes/mongoose-id.validation.pipe';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Patch()
  updateUser(
    @Body() requestedUpdate: UpdateUsersDto,
    @GetCurrentUserId() userId: string,
  ): Promise<PublicUserDetails> {
    return this.userService.updateUser(requestedUpdate, userId);
  }

  @Get('list')
  getAllUsers(): Promise<PublicUserDetails[]> {
    return this.userService.getAllUsers();
  }

  @Get(':requestedUserId')
  getUserById(
    @Param('requestedUserId', new MongoIdValidationPipe())
    requestedUserId: string,
  ): Promise<PublicUserDetails> {
    return this.userService.getUserById(requestedUserId);
  }

  @Delete('/me')
  deleteUser(@GetCurrentUserId() userId: string): Promise<PublicUserDetails> {
    return this.userService.deleteUser(userId);
  }
}
