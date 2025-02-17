import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

import { UserManagementModule } from './user-management/user-management.module';

@Module({
  imports: [
    UserManagementModule,
    RouterModule.register([{ path: 'admin', module: UserManagementModule }]),
  ],
  exports: [UserManagementModule],
})
export class AdminModule {}
