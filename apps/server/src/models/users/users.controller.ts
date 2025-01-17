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

import { PathCurrentUserDto } from './dto/patch-current-user.dto';
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

    return {
      status: HttpStatus.OK,
    };
  }
}
