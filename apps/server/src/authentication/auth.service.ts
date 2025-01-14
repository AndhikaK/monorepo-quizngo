import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

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

    if (!user) throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);

    if (user.password !== password) {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
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
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);

    await this.userService.createUser({
      name: payload.name,
      password: payload.password,
      email: payload.email,
    });
  }
}
