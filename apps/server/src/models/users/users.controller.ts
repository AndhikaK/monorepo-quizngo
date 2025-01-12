import { Controller, Get, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '@/authentication/guards/jwt-auth.guard';

@Controller({
  path: 'users',
})
export class UsersController {
  @Get()
  @UseGuards(JwtAuthGuard)
  currentUser() {
    return {
      data: {
        name: 'test_user',
      },
    };
  }
}
