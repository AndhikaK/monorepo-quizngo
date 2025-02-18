import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { User } from '@/client/users/entities/users.entity';
import { AppLogger } from '@/common/logger/app.logger';
import { FeatureFlagService } from '@/config/feature-flag/feature-flag.service';

import { RegisterDto } from './dto/register.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';

@Controller({
  path: 'auth',
})
export class AuthController {
  private logger = new AppLogger();

  constructor(
    private authService: AuthService,
    private featureFlagService: FeatureFlagService
  ) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: Request & { user: User }) {
    const isLoginEnabled = await this.featureFlagService.isFeatureEnabled(
      'is_login_enabled'
    );

    console.log('FeatureFlag' + JSON.stringify(isLoginEnabled));

    return 'hehe';
  }

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto) {
    await this.authService.register(registerDto);

    return {
      message: 'User Created',
    };
  }
}
