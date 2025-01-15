import {
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

import { UsersService } from './users.service';

@Controller({
  path: 'users',
})
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  currentUser(@Request() req: AuthenticatedRequest) {
    return req.user;
  }

  @Patch('me')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async patchCurrentUser(
    @Request() req: AuthenticatedRequest,
    @UploadedFile() file: Express.Multer.File
  ) {
    const displayPictureBuffer = file.buffer;

    await this.usersService.uploadDisplayPicture(
      req.user,
      displayPictureBuffer
    );

    return {
      status: HttpStatus.OK,
    };
  }
}
