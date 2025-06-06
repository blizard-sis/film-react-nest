import { Module, DynamicModule, Provider, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { configProvider } from '../app.config.provider';
import { FilmEntity } from '../films/film.entity';
import { ScheduleEntity } from '../schedule/schedule.entity';
import { MongoRepository } from '../repository/mongo.repository';
import { PostgresRepository } from '../repository/postgres.repository';

import { mongoConnectionProvider } from './mongo.provider';
@Global()
@Module({})
export class DatabaseModule {
  static register(): DynamicModule {
    const imports = [];
    const providers: Provider[] = [];
    const exports = [];
    const driver = process.env.DATABASE_DRIVER || 'mongodb';

    switch (driver) {
      case 'mongodb':
        imports.push(ConfigModule);
        providers.push(configProvider, mongoConnectionProvider, {
          provide: 'FILMS_REPOSITORY',
          useClass: MongoRepository,
        });
        exports.push(mongoConnectionProvider, 'FILMS_REPOSITORY');
        break;
      case 'postgres':
        imports.push(
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
        );
        providers.push({
          provide: 'FILMS_REPOSITORY',
          useClass: PostgresRepository,
        });
        exports.push(TypeOrmModule, 'FILMS_REPOSITORY');
        break;
      default:
        throw new Error(`Unsupported database driver: ${driver}`);
    }
    return {
      module: DatabaseModule,
      imports,
      providers,
      exports,
    };
  }
}
