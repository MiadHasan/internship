import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from 'src/schemas/users.schema';
import { UpdateUsersDto } from './dto/update-users.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(Users.name) private readonly usersModel: Model<Users>,
  ) {}

  async updateUser(requestedUpdate: UpdateUsersDto, username: string) {
    return await this.usersModel.findOneAndUpdate(
      { username },
      { ...requestedUpdate },
    );
  }
}
