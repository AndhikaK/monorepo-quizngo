import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Patch,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { JwtAuthGuard } from '@/authentication/guards/jwt-auth.guard';
import { AuthenticatedRequest } from '@/authentication/interfaces/authenticated-request.interface';
import { AppLogger } from '@/common/logger/app.logger';

import { PathCurrentUserDto } from './dto/patch-current-user.dto';
import { UsersService } from './users.service';

import 'multer';

@Controller({
  path: 'users',
})
export class UsersController {
  private readonly logger = new AppLogger();
  constructor(private usersService: UsersService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async currentUser(@Request() req: AuthenticatedRequest) {
    const user = this.usersService.findUserByEmail(req.user.email);

    this.logger.info('getting current user');

    return user;
  }

  @Patch('me')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async patchCurrentUser(
    @Request() req: AuthenticatedRequest,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: PathCurrentUserDto
  ) {
    const displayPictureBuffer = file.buffer;

    const pathCurrentUserPayload = {
      name: body.name,
    };

    await this.usersService.patchCurrentUser(
      req.user,
      displayPictureBuffer,
      pathCurrentUserPayload
    );

    this.logger.debug('getting current user');

    return {
      status: HttpStatus.OK,
    };
  }
}
