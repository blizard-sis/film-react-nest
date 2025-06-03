import { Injectable } from '@nestjs/common';

import { FilmsRepository } from '../repository/films.repository';
import { FilmDto, ScheduleDto } from './dto/films.dto';

@Injectable()
export class FilmsService {
  constructor(private readonly repo: FilmsRepository) {}

  async getAllFilms(): Promise<{ total: number; items: FilmDto[] }> {
    const films = await this.repo.findAll();

    const mapped: FilmDto[] = films.map((film) => ({
      id: film.id,
      rating: film.rating,
      director: film.director,
      tags: film.tags,
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
      hall: session.hall,
      rows: session.rows,
      seats: session.seats,
      price: session.price,
      taken: session.taken,
    }));
    return {
      total: mapped.length,
      items: mapped,
    };
  }
}
