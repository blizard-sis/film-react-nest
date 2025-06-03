import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { mongoConnectionProvider } from './mongo.provider';
import { configProvider } from '../app.config.provider';

@Module({
  imports: [ConfigModule],
  providers: [configProvider, mongoConnectionProvider],
  exports: [mongoConnectionProvider],
})
export class DatabaseModule {}
