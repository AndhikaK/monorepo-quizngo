import { Controller, Post, UseGuards } from '@nestjs/common';

import { LocalAuthGuard } from './local-auth.guard';

@Controller({
  path: 'auth',
})
export class AuthController {
  @Post('/login')
  @UseGuards(LocalAuthGuard)
  login() {
    return { message: 'hello' };
  }
}
