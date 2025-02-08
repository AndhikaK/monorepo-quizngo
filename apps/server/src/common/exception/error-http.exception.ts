import { HttpException, HttpStatus } from '@nestjs/common';

import { ErrorCode, errorCodes } from './error-codes';

export class ErrorHttpException extends HttpException {
  constructor(
    errorCodeKey: ErrorCode,
    status: HttpStatus = HttpStatus.BAD_REQUEST,
    additionalData?: Record<string, unknown>
  ) {
    const message = errorCodes[errorCodeKey];
    if (!message) {
      throw new Error(`Invalid error code: ${errorCodeKey}`);
    }

    const response = {
      errorCode: errorCodeKey,
      message,
      ...(additionalData && { additionalData }),
    };

    super(response, status);
  }
}
