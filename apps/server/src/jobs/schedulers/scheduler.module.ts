import { Module } from '@nestjs/common';

import { EnvModule } from '@/config/env/env.module';
import { UsersModule } from '@/client/users/users.module';

import { CreateUserJobScheduler } from './create-user.scheduler';

@Module({
  imports: [UsersModule, EnvModule],
  providers: [CreateUserJobScheduler],
})
export class SchedulerModule {}
