import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { LocalStrategy } from '@/authentication/strategies/local.strategy';
import { UsersModule } from '@/client/users/users.module';
import { EnvModule } from '@/config/env/env.module';
import { EnvService } from '@/config/env/env.service';
import { FeatureFlagModule } from '@/config/feature-flag/feature-flag.module';

import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    EnvModule,
    FeatureFlagModule,
    JwtModule.registerAsync({
      imports: [EnvModule],
      inject: [EnvService],
      useFactory: (envService: EnvService) => {
        return {
          secret: envService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: envService.get('JWT_EXPIRES_IN'),
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
