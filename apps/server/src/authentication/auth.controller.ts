import { Controller, Post, Request, UseGuards } from '@nestjs/common';

import { User } from '@/models/users/entities/users.entity';

import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';

@Controller({
  path: 'auth',
})
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  login(@Request() req: Request & { user: User }) {
    return this.authService.login(req.user);
  }
}
