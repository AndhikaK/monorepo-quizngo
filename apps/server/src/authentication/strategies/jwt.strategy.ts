import { ExtractJwt, Strategy } from 'passport-jwt';

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { UsersService } from '@/client/users/users.service';
import { EnvService } from '@/config/env/env.service';

import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private envService: EnvService,
    private userService: UsersService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: envService.get('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload) {
    const user = this.userService.getUserById(payload.id);

    return user;
  }
}
