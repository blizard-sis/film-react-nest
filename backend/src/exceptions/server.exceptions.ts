// exceptions/server.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';

import { ErrorCode, code2message, code2status } from './error-codes';

export class ServerException extends HttpException {
  constructor(code: ErrorCode) {
    const message = code2message.get(code) ?? 'Unknown error';
    const status = code2status.get(code) ?? HttpStatus.INTERNAL_SERVER_ERROR;

    super({ error: message }, status);
  }
}
