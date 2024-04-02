import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { jwtPayload } from 'src/common/interfaces/jwt-payload.interface';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('REFRESH_TOKEN'),
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: jwtPayload) {
    const refreshToken = req.get('authorization').replace('Bearer', '').trim();
    return {
      ...payload,
      refreshToken,
    };
  }
}
