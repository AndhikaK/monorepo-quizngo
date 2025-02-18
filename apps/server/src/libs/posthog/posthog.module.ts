import { Module } from '@nestjs/common';

import { EnvModule } from '@/config/env/env.module';

import { PosthogService } from './posthog.service';

@Module({
  imports: [EnvModule],
  providers: [PosthogService],
  exports: [PosthogService],
})
export class PosthogModule {}
