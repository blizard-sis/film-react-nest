import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class JsonLogger implements LoggerService {
  private format(level: string, message: any, ...optional: any[]) {
    const time = new Date().toISOString();
    return JSON.stringify({ time, level, message, optional });
  }

  log(message: any, ...optional: any[]) {
    console.log(this.format('log', message, ...optional));
  }

  error(message: any, ...optional: any[]) {
    console.error(this.format('error', message, ...optional));
  }

  warn(message: any, ...optional: any[]) {
    console.warn(this.format('warn', message, ...optional));
  }

  debug?(message: any, ...optional: any[]) {
    console.debug(this.format('debug', message, ...optional));
  }

  verbose?(message: any, ...optional: any[]) {
    console.log(this.format('verbose', message, ...optional));
  }
}
