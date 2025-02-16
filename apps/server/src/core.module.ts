import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EnvModule } from './config/env/env.module';
import { TypeOrmDatabaseProvider } from './providers/database/postgres/provider.module';

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
  ],
  exports: [ConfigModule, TypeOrmModule, EnvModule],
})
export class CoreModule {}
