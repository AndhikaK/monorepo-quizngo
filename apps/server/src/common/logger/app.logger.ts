import * as winston from 'winston';

import { Injectable } from '@nestjs/common';

const customLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
    http: 4,
    verbose: 5,
    input: 6,
    silly: 7,
    data: 8,
    help: 9,
    prompt: 10,
    emerg: 11,
    alert: 12,
    crit: 13,
    notice: 14,
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    debug: 'blue',
    http: 'magenta',
    verbose: 'cyan',
    input: 'grey',
    silly: 'magenta',
    data: 'white',
    help: 'cyan',
    prompt: 'grey',
    emerg: 'red',
    alert: 'yellow',
    crit: 'red',
    notice: 'blue',
  },
};
@Injectable()
export class AppLogger {
  private readonly logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize({ all: true, colors: customLevels.colors }),
        winston.format.printf(({ timestamp, level, message }) => {
          return `${timestamp} [${level}]: ${message}`;
        })
      ),
    });

    if (process.env.NODE_ENV !== 'production') {
      // APP_ENV is accessed from env file
      this.logger.add(new winston.transports.Console());
    }
  }

  error(message: string, trace?: string) {
    this.logger.error(`${message} - ${trace}`);
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  info(message: string) {
    this.logger.info(message);
  }
}
