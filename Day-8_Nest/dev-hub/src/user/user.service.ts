import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from 'src/schemas/users.schema';
import { UpdateUsersDto } from './dto/update-users.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(Users.name) private readonly usersModel: Model<Users>,
  ) {}

  async updateUser(requestedUpdate: UpdateUsersDto, userId: string) {
    if (requestedUpdate.hasOwnProperty('password')) {
      const user = await this.usersModel.findById(userId);
      if (
        user &&
        !(await bcrypt.compare(requestedUpdate.password, user.password))
      ) {
        const salt = await bcrypt.genSalt();
        requestedUpdate.password = await bcrypt.hash(
          requestedUpdate.password,
          salt,
        );
      }
    }
    return await this.usersModel.findByIdAndUpdate(userId, {
      ...requestedUpdate,
    });
  }
}
