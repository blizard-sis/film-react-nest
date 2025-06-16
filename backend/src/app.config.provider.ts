// src/app.config.provider.ts
import { ConfigModule, ConfigService } from '@nestjs/config';

export const configProvider = {
  imports: [ConfigModule],
  inject: [ConfigService],
  provide: 'CONFIG',
  useFactory: (configService: ConfigService): AppConfig => ({
    database: {
      driver: configService.get<string>('DATABASE_DRIVER', 'memory'),
      mongodbUrl: configService.get<string>('MONGODB_URL', ''),
      host: configService.get<string>('DATABASE_HOST', ''),
      port: configService.get<number>('DATABASE_PORT', 5432),
      name: configService.get<string>('DATABASE_NAME', ''),
      username: configService.get<string>('DATABASE_USERNAME', ''),
      password: configService.get<string>('DATABASE_PASSWORD', ''),
    },
  }),
};

export interface AppConfig {
  database: AppConfigDatabase;
}

export interface AppConfigDatabase {
  driver: string;
  mongodbUrl: string;
  host: string;
  port: number;
  name: string;
  username: string;
  password: string;
}
