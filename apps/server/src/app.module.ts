import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';

import { AuthModule } from '@/authentication/auth.module';
import { ClientModule } from '@/client/client.module';
import { HttpExceptionFilter } from '@/common/exception/http-exception.filter';
import { JobsModule } from '@/jobs/jobs.module';

import { CoreModule } from './core.module';

@Module({
  imports: [
    CoreModule,
    ScheduleModule.forRoot(),
    AuthModule,
    ClientModule,
    JobsModule,
  ],
  providers: [{ provide: APP_FILTER, useClass: HttpExceptionFilter }],
})
export class AppModule {}
