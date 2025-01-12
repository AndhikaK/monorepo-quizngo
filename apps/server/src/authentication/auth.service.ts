import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  getData() {
    return {
      data: 'hehe',
    };
  }

  async validateUser(username: string, password: string) {
    return {
      name: 'test_user',
    };
  }

  async login(user: any) {
    const payload = { username: 'test', sub: 'test-password' };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
