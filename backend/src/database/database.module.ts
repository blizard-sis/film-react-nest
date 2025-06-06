// import { Module } from '@nestjs/common';
// import { ConfigModule } from '@nestjs/config';
// import { mongoConnectionProvider } from './mongo.provider';
// import { configProvider } from '../app.config.provider';

// @Module({
//   imports: [ConfigModule],
//   providers: [configProvider, mongoConnectionProvider],
//   exports: [mongoConnectionProvider],
// })
// export class DatabaseModule {}

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmEntity } from '../films/film.entity';
import { ScheduleEntity } from '../schedule/schedule.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DATABASE_HOST'),
        port: config.get('DATABASE_PORT'),
        username: config.get('DATABASE_USERNAME'),
        password: config.get('DATABASE_PASSWORD'),
        database: config.get('DATABASE_NAME'),
        entities: [FilmEntity, ScheduleEntity],
        synchronize: false,
      }),
    }),
    TypeOrmModule.forFeature([FilmEntity, ScheduleEntity]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
