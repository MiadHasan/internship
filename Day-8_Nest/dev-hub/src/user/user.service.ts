import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from 'src/schemas/users.schema';
import { UpdateUsersDto } from './dto/update-users.dto';
import * as bcrypt from 'bcrypt';
import { PublicUserDetails } from './interface/user-details.interface';
import { getPublicUserDetails } from 'src/common/utils/get-public-user-details';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(Users.name) private readonly usersModel: Model<Users>,
  ) {}

  //user can update password, skills and experience
  async updateUser(
    requestedUpdate: UpdateUsersDto,
    userId: string,
  ): Promise<PublicUserDetails> {
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
    const updatedUser = await this.usersModel.findByIdAndUpdate(
      userId,
      {
        ...requestedUpdate,
      },
      { new: true },
    );
    return getPublicUserDetails(updatedUser);
  }

  //getting all registered users
  async getAllUsers(): Promise<PublicUserDetails[]> {
    const users = await this.usersModel.find();
    const usersDetails = users.map((user) => getPublicUserDetails(user));
    return usersDetails;
  }

  //get a specific user with userId
  async getUserById(requestedUserId: string): Promise<PublicUserDetails> {
    const user = await this.usersModel.findById(requestedUserId);
    if (!user) throw new NotFoundException('No user found!');
    return getPublicUserDetails(user);
  }

  //delete user account
  async deleteUser(userId: string): Promise<PublicUserDetails> {
    const user = await this.usersModel.findByIdAndDelete(userId);
    return getPublicUserDetails(user);
  }
}
