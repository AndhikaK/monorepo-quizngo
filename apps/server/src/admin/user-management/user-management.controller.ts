import { Controller, Get, Query } from '@nestjs/common';

import { UsersService } from '@/client/users/users.service';
import { GenericFilter } from '@/common/filter/generic.filter';
import { AppLogger } from '@/common/logger/app.logger';

@Controller({
  path: 'user-management',
})
export class UserManagementController {
  private logger = new AppLogger();
  constructor(private userService: UsersService) {}

  @Get('users')
  async getAllUser(@Query() filter: GenericFilter) {
    this.logger.info(JSON.stringify(filter));
    const allUser = await this.userService.findAll();

    return allUser;
  }
}
