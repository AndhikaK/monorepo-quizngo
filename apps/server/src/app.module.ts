import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '@/authentication/auth.module';
import { envSchema } from '@/config/env/env';
import { EnvModule } from '@/config/env/env.module';

import { UsersModule } from './models/users/users.module';
import { TypeOrmDatabaseProvider } from './providers/database/postgres/provider.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (env) => envSchema.parse(env),
    }),
    TypeOrmModule.forRootAsync({
      imports: [EnvModule],
      useClass: TypeOrmDatabaseProvider,
    }),
    EnvModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
