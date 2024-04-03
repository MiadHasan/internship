import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import mongoose from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';

type jwtPayload = {
  username: string;
  userId: mongoose.Types.ObjectId;
};

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'access-token-secret',
    });
  }

  validate(payload: jwtPayload) {
    return payload;
  }
}
