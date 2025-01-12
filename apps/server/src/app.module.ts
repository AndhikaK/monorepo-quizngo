import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from '@/authentication/auth.module';
import { envSchema } from '@/config/env/env';
import { EnvModule } from '@/config/env/env.module';

import { UsersModule } from './models/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (env) => envSchema.parse(env),
    }),
    EnvModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
