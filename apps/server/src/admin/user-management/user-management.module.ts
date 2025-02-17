import { Module } from '@nestjs/common';

import { UsersModule } from '@/client/users/users.module';

import { UserManagementController } from './user-management.controller';

@Module({
  imports: [UsersModule],
  controllers: [UserManagementController],
})
export class UserManagementModule {}
