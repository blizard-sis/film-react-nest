import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import 'dotenv/config';

import { AppModule } from './app.module';
import { DevLogger } from './logger/dev.logger';
import { JsonLogger } from './logger/json.logger';
import { TskvLogger } from './logger/tskv.logger';

async function bootstrap() {
  const { PORT = 3000, LOGGER = 'dev' } = process.env;

  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const loggerMap = {
    dev: new DevLogger(),
    json: new JsonLogger(),
    tskv: new TskvLogger(),
  };

  app.useLogger(loggerMap[LOGGER] ?? new DevLogger());

  app.setGlobalPrefix('api/afisha');
  app.enableCors();

  const logger = new Logger('Main');
  logger.log(`🚀 App starting on port ${PORT} with logger: ${LOGGER}`);
  await app.listen(PORT);
}
bootstrap();
