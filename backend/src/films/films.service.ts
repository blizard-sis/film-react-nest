import { Injectable } from '@nestjs/common';

import { MongoRepository } from '../repository/mongo.repository';
import { PostgresRepository } from '../repository/postgres.repository';
import { FilmDto, ScheduleDto } from './dto/films.dto';

@Injectable()
export class FilmsService {
  constructor(private readonly repo: PostgresRepository) {}

  async getAllFilms(): Promise<{ total: number; items: FilmDto[] }> {
    const films = await this.repo.findAll();

    const mapped: FilmDto[] = films.map((film) => ({
      id: film.id,
      rating: film.rating,
      director: film.director,
      tags: film.tags.split(','),
      title: film.title,
      about: film.about,
      description: film.description,
      image: film.image,
      cover: film.cover,
    }));

    return {
      total: mapped.length,
      items: mapped,
    };
  }

  async getFilmSchedule(
    id: string,
  ): Promise<{ total: number; items: ScheduleDto[] }> {
    const sessions = await this.repo.findScheduleByFilmId(id);

    const mapped: ScheduleDto[] = sessions.map((session) => ({
      id: session.id,
      daytime: session.daytime,
      hall: session.hall.toString(),
      rows: session.rows,
      seats: session.seats,
      price: session.price,
      taken: session.taken.split(','),
    }));
    return {
      total: mapped.length,
      items: mapped,
    };
  }
}
