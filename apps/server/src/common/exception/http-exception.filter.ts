import { Response } from 'express';
import { STATUS_CODES } from 'http';

import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

import { errorCodes } from './error-codes';
import { ErrorHttpException } from './error-http.exception';

interface CustomErrorResponse {
  errorCode: string;
  message: string;
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: ErrorHttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus() || 500;
    const exceptionResponse = exception.getResponse();

    let errorResponse: CustomErrorResponse;

    if (typeof exceptionResponse === 'string') {
      errorResponse = {
        errorCode: 'UNKNOWN_ERROR',
        message: exceptionResponse,
      };
    } else if (
      typeof exceptionResponse === 'object' &&
      exceptionResponse !== null
    ) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const code = (exceptionResponse as any).errorCode;
      errorResponse = {
        errorCode: code || 'UNKNOWN_ERROR',
        message: errorCodes[code] || 'General Error',
      };
    } else {
      errorResponse = {
        errorCode: 'UNKNOWN_ERROR',
        message: 'An unexpected error occurred',
      };
    }

    response.status(status).json({
      statusCode: status,
      statusMessage: STATUS_CODES[status],
      error: errorResponse,
      timestamp: new Date().toISOString(),
    });
  }
}
