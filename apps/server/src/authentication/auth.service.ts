import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
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
}
