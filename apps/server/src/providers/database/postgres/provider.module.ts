import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import { EnvService } from '@/config/env/env.service';
import { UserPreferences } from '@/models/users/entities/user-preferences.entity';
import { User } from '@/models/users/entities/users.entity';

@Injectable()
export class TypeOrmDatabaseProvider implements TypeOrmOptionsFactory {
  constructor(private envService: EnvService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.envService.get('DB_HOST'),
      port: +this.envService.get('DB_PORT'),
      username: this.envService.get('DB_USER'),
      password: this.envService.get('DB_PASSWORD'),
      database: this.envService.get('DB_NAME'),
      entities: [User, UserPreferences],
      retryAttempts: 3,
      synchronize: false,
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    };
  }
}
