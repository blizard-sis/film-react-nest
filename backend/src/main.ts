import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
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
  await app.listen(PORT);
}
bootstrap();
