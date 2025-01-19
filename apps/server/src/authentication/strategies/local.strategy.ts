import { Strategy } from 'passport-local';

import { HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { ErrorHttpException } from '@/common/exception/error-http.exception';

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
      throw new ErrorHttpException('401001', HttpStatus.BAD_REQUEST);

    return validationResult;
  }
}
