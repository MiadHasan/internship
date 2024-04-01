import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from 'src/schemas/users.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Users.name) private readonly usersModel: Model<Users>,
    private jwtService: JwtService,
  ) {}

  async getTokens(username: string) {
    const jwtPayload = {
      username,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: 'access-token-secret',
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: 'refresh-token-secret',
        expiresIn: '7d',
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async updateRefreshToken(username: string, refreshToken: string) {
    await this.usersModel.findOneAndUpdate({ username }, { refreshToken });
  }

  async refreshTokens(username: string, refreshToken: string) {
    const user = await this.usersModel.findOne({ username }).exec();
    if (!user) throw new ForbiddenException('Access Denied!');
    if (refreshToken !== user.refreshToken)
      throw new ForbiddenException('Access Denied!');
    const tokens = await this.getTokens(username);
    await this.updateRefreshToken(username, tokens.refresh_token);
    return tokens;
  }

  async logout(username: string) {
    await this.updateRefreshToken(username, '');
  }

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
      const tokens = await this.getTokens(username);
      await this.updateRefreshToken(username, tokens.refresh_token);
      return tokens;
    } else {
      throw new UnauthorizedException('Please check sign in credentials');
    }
  }
}
