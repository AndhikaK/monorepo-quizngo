import { Controller, Get, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '@/authentication/guards/jwt-auth.guard';

import { UsersService } from './users.service';

@Controller({
  path: 'users',
})
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  currentUser() {
    return this.usersService.findAll();
    // return {
    //   data: {
    //     name: 'test_user',
    //   },
    // };
  }
}
