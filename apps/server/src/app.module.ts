import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '@/authentication/auth.module';
import { HttpExceptionFilter } from '@/common/exception/http-exception.filter';
import { envSchema } from '@/config/env/env';
import { EnvModule } from '@/config/env/env.module';
import { QuestionsModule } from '@/models/questions/questions.module';
import { UsersModule } from '@/models/users/users.module';
import { TypeOrmDatabaseProvider } from '@/providers/database/postgres/provider.module';

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
    QuestionsModule,
  ],
  providers: [{ provide: APP_FILTER, useClass: HttpExceptionFilter }],
})
export class AppModule {}
