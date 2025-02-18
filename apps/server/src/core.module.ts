import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EnvModule } from '@/config/env/env.module';
import { FeatureFlagModule } from '@/config/feature-flag/feature-flag.module';
import { PosthogModule } from '@/libs/posthog/posthog.module';
import { TypeOrmDatabaseProvider } from '@/providers/database/postgres/provider.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [EnvModule],
      useClass: TypeOrmDatabaseProvider,
    }),
    EnvModule,
    PosthogModule,
    FeatureFlagModule,
  ],
  exports: [
    ConfigModule,
    TypeOrmModule,
    EnvModule,
    PosthogModule,
    FeatureFlagModule,
  ],
})
export class CoreModule {}
