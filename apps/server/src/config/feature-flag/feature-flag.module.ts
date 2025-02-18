import { Module } from '@nestjs/common';

import { PosthogModule } from '@/libs/posthog/posthog.module';

import { FeatureFlagService } from './feature-flag.service';

@Module({
  imports: [PosthogModule],
  providers: [FeatureFlagService],
  exports: [FeatureFlagService],
})
export class FeatureFlagModule {}
