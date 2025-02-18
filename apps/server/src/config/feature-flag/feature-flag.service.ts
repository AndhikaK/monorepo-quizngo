import { Injectable } from '@nestjs/common';

import { AppLogger } from '@/common/logger/app.logger';
import { PosthogService } from '@/libs/posthog/posthog.service';

import { FeatureFlagKey } from './feature-flag.key';

@Injectable()
export class FeatureFlagService {
  private logger = new AppLogger();
  constructor(private posthogService: PosthogService) {}

  async isFeatureEnabled(
    key: FeatureFlagKey,
    distinctId = 'all',
    options?: {
      groups?: Record<string, string>;
      personProperties?: Record<string, any>;
      groupProperties?: Record<string, any>;
    }
  ): Promise<boolean | undefined> {
    const featureFlagValue = await this.posthogService
      .getClient()
      .isFeatureEnabled(key, distinctId, options);

    this.logger.info(`FeatureFlag [${key}]: ${featureFlagValue}`);

    return featureFlagValue;
  }
}
