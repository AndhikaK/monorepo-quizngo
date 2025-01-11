import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from '@/authentication/auth.module';
import { envSchema } from '@/config/env/env';
import { EnvModule } from '@/config/env/env.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (env) => envSchema.parse(env),
    }),
    EnvModule,
    AuthModule,
  ],
})
export class AppModule {}
