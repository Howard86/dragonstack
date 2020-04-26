import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { jwtConstants } from '../constants';
import { AuthService } from '../auth.service';

interface JwtPayload {
  sub: string;
  username: string;
}

// ! figure how to properly imply in dragonstack
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: JwtPayload) {
    const { username, sub: userId } = payload;
    // TODO: add validation logic here
    // const user = await this.authService.

    return { userId, username };
  }
}
