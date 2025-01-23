/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';

import { HttpExceptionFilter } from '@/common/exception/http-exception.filter';
import { AppLogger } from '@/common/logger/app.logger';
import { ResponseInterceptor } from '@/common/response/global-response.interceptor';
import { EnvService } from '@/config/env/env.service';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(EnvService);

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  // global interceptors
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalInterceptors(new ResponseInterceptor());

  // global pipes
  app.useGlobalPipes(new ValidationPipe());

  // global filters
  app.useGlobalFilters(new HttpExceptionFilter());

  const port = configService.get('PORT');
  await app.listen(port);

  const logger = new AppLogger();
  logger.info(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
