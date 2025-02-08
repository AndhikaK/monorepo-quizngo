import {
  UploadApiOptions,
  UploadApiResponse,
  v2 as cloudinary,
} from 'cloudinary';

import { Injectable } from '@nestjs/common';

import { EnvService } from '@/config/env/env.service';

import { FilePathUrl } from './interfaces/files.interfaces';

@Injectable()
export class FilesService {
  constructor(private envService: EnvService) {}

  async upload(
    fileBuffer: Buffer,
    fileName: string,
    path: string
  ): Promise<FilePathUrl> {
    cloudinary.config({
      cloud_name: this.envService.get('CLOUDINARY_CLOUD_NAME'),
      api_key: this.envService.get('CLOUDINARY_API_KEY'),
      api_secret: this.envService.get('CLOUDINARY_API_SECRET'),
    });

    const uploadPath = this.envService.get('PROJECT_ID') + '/' + path;

    const uploadOptions: UploadApiOptions = {
      public_id: fileName,
      folder: uploadPath,
    };

    // Upload an image
    const uploadResult = await new Promise<UploadApiResponse>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(uploadOptions, (error, uploadResult) => {
            if (error) {
              console.error('FilesService - upload | ', error);
              reject(error);
            }

            return resolve(uploadResult);
          })
          .end(fileBuffer);
      }
    );

    return uploadResult.url;
  }
}
