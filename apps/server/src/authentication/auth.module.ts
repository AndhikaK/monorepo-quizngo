import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { LocalStrategy } from '@/models/user/local.strategy';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [PassportModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
