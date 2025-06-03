import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ServerException } from '../exceptions/server.exceptions';

@Catch(ServerException)
export class ServerExceptionFilter implements ExceptionFilter {
  catch(exception: ServerException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const exceptionResponse = exception.getResponse();

    response.status(exception.getStatus()).json(exceptionResponse);
  }
}
