import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import mongoose from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';

type jwtPayload = {
  username: string;
  userId: mongoose.Types.ObjectId;
};

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('ACCESS_TOKEN'),
    });
  }

  validate(payload: jwtPayload) {
    return payload;
  }
}
