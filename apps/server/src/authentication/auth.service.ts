import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  getData() {
    return {
      data: 'hehe',
    };
  }
}
