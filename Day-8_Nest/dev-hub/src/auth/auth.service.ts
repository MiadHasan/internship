import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Users } from 'src/schemas/users.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { jwtPayload } from 'src/common/interfaces/jwt-payload.interface';
import { Tokens } from './interfaces/tokens.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Users.name) private readonly usersModel: Model<Users>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async getTokens(
    username: string,
    userId: mongoose.Types.ObjectId,
  ): Promise<Tokens> {
    const jwtPayload: jwtPayload = {
      username,
      userId,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get('ACCESS_TOKEN'),
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get('REFRESH_TOKEN'),
        expiresIn: '7d',
      }),
    ]);
    const tokens: Tokens = {
      accessToken: at,
      refreshToken: rt,
    };
    return tokens;
  }

  async updateRefreshToken(
    userId: string | mongoose.Types.ObjectId,
    refreshToken: string,
  ) {
    await this.usersModel.findByIdAndUpdate(userId, { refreshToken });
  }

  async refreshTokens(userId: string, refreshToken: string): Promise<Tokens> {
    const user = await this.usersModel.findById(userId);
    if (!user) throw new ForbiddenException('Access Denied!');
    if (refreshToken !== user.refreshToken)
      throw new ForbiddenException('Access Denied!');
    const tokens = await this.getTokens(user.username, user._id);
    await this.updateRefreshToken(user._id, tokens.refreshToken);
    return tokens;
  }

  async logout(userId: string) {
    await this.updateRefreshToken(userId, '');
  }

  async signUp(createUserDto: CreateUserDto): Promise<Users> {
    const { username, password } = createUserDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = {
      username,
      password: hashedPassword,
      skills: [],
      experience: 0,
    };
    const newUser = new this.usersModel(user);
    return await newUser.save();
  }

  async signIn(createUserDto: CreateUserDto): Promise<Tokens> {
    const { username, password } = createUserDto;
    const user = await this.usersModel.findOne({ username }).exec();
    if (user && (await bcrypt.compare(password, user.password))) {
      const tokens = await this.getTokens(username, user._id);
      await this.updateRefreshToken(user._id, tokens.refreshToken);
      return tokens;
    } else {
      throw new UnauthorizedException('Please check sign in credentials');
    }
  }
}
