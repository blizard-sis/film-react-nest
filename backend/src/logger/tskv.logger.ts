import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class TskvLogger implements LoggerService {
  private format(level: string, message: any, ...optional: any[]): string {
    const timestamp = `time=${new Date().toISOString()}`;
    const levelStr = `level=${level}`;
    const msgStr = `message=${message}`;
    const extra = optional
      .map((p, i) => `param${i}=${JSON.stringify(p)}`)
      .join('\t');
    return [timestamp, levelStr, msgStr, extra].filter(Boolean).join('\t');
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
