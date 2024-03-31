import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from 'src/schemas/users.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Users.name) private readonly usersModel: Model<Users>,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<Users> {
    const { username, password } = createUserDto;
    const user = {
      username,
      password,
      skills: [],
      experience: 0,
    };
    const newUser = new this.usersModel(user);
    return await newUser.save();
  }

  async signIn(createUserDto: CreateUserDto) {
    const { username, password } = createUserDto;
    const user = await this.usersModel.findOne({ username }).exec();
    if (username && password === user.password) {
      return 'success';
    } else {
      throw new UnauthorizedException('Please check sign in credentials');
    }
  }
}
