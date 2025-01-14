import { Controller, Get, Request, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '@/authentication/guards/jwt-auth.guard';
import { AuthenticatedRequest } from '@/authentication/interfaces/authenticated-request.interface';

import { UsersService } from './users.service';

@Controller({
  path: 'users',
})
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  currentUser(@Request() req: AuthenticatedRequest) {
    return req.user;
  }
}
