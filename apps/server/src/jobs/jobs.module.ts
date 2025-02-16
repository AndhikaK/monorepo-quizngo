import { Module } from '@nestjs/common';

import { SchedulerModule } from './schedulers/scheduler.module';

@Module({
  imports: [SchedulerModule],
  exports: [SchedulerModule],
})
export class JobsModule {}
