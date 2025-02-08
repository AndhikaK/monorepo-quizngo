import { Module } from '@nestjs/common';

import { EnvModule } from '@/config/env/env.module';
import { EnvService } from '@/config/env/env.service';

import { FilesService } from './files.service';

@Module({
  imports: [EnvModule],
  providers: [FilesService, EnvService],
  exports: [FilesService],
})
export class FilesModule {}
