import { Injectable, Inject } from '@nestjs/common';

import { MongoRepository } from '../repository/mongo.repository';
import { PostgresRepository } from '../repository/postgres.repository';

import { FilmDto, ScheduleDto } from './dto/films.dto';

@Injectable()
export class FilmsService {
  constructor(
    @Inject('FILMS_REPOSITORY')
    private readonly repo: MongoRepository | PostgresRepository,
  ) {}

  async getAllFilms(): Promise<{ total: number; items: FilmDto[] }> {
    const items = await this.repo.findAll();
    return {
      total: items.length,
      items,
    };
  }

  async getFilmSchedule(
    id: string,
  ): Promise<{ total: number; items: ScheduleDto[] }> {
    const items = await this.repo.findScheduleByFilmId(id);
    return {
      total: items.length,
      items,
    };
  }
}
