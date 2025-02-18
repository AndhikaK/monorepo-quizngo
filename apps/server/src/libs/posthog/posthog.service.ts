import { PostHog } from 'posthog-node';

import {
  Injectable,
  OnApplicationShutdown,
  OnModuleDestroy,
} from '@nestjs/common';

import { EnvService } from '@/config/env/env.service';

@Injectable()
export class PosthogService implements OnModuleDestroy, OnApplicationShutdown {
  private client: PostHog;

  constructor(private envService: EnvService) {
    this.client = new PostHog(this.envService.get('POSTHOG_API_KEY'));
  }

  getClient(): PostHog {
    return this.client;
  }

  async onModuleDestroy() {
    await this.client.shutdown();
    console.log('PostHog client shutdown (onModuleDestroy)');
  }

  async onApplicationShutdown() {
    await this.client.shutdown();
    console.log('PostHog client shutdown (onApplicationShutdown)');
  }
}
