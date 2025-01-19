import * as bcrypt from 'bcrypt';

import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { ErrorHttpException } from '@/common/exception/error-http.exception';
import { User } from '@/models/users/entities/users.entity';
import { UsersService } from '@/models/users/users.service';

import { RegisterDto } from './dto/register.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findUserByEmail(email);

    if (!user) throw new ErrorHttpException('401001', HttpStatus.BAD_REQUEST);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new ErrorHttpException('401001', HttpStatus.BAD_REQUEST);
    }

    return user;
  }

  login(user: User) {
    const jwtPayload: JwtPayload = {
      id: user.id,
    };

    const jwtToken = this.jwtService.sign(jwtPayload);

    return {
      access_token: jwtToken,
    };
  }

  async register(payload: RegisterDto) {
    const validateExistingUser = await this.userService.findUserByEmail(
      payload.email
    );

    if (validateExistingUser)
      throw new ErrorHttpException('401002', HttpStatus.FORBIDDEN);

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(payload.password, salt);

    await this.userService.createUser({
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
    });
  }
}
