import { Module } from '@nestjs/common';

import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { MongoRepository } from '../repository/mongo.repository';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [FilmsController],
  providers: [FilmsService, MongoRepository],
  exports: [MongoRepository],
})
export class FilmsModule {}
