import { Strategy } from 'passport-local';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<unknown> {
    const validationResult = await this.authService.validateUser(
      email,
      password
    );

    if (!validationResult)
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);

    return validationResult;
  }
}
