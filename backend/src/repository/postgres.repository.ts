import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { FilmEntity } from '../films/film.entity';
import { ScheduleEntity } from '../schedule/schedule.entity';
import { FilmDto, ScheduleDto } from '../films/dto/films.dto';

import { IFilmsRepository } from './films.repository.interface';

@Injectable()
export class PostgresRepository implements IFilmsRepository {
  constructor(
    @InjectRepository(FilmEntity)
    private filmRepo: Repository<FilmEntity>,
    @InjectRepository(ScheduleEntity)
    private scheduleRepo: Repository<ScheduleEntity>,
  ) {}

  async findAll(): Promise<FilmDto[]> {
    const films = await this.filmRepo.find({ relations: ['schedule'] });
    return films.map((film) => ({
      ...film,
      tags: film.tags.split(','),
    }));
  }

  async findById(
    id: string,
  ): Promise<(FilmDto & { schedule: ScheduleDto[] }) | null> {
    const film = await this.filmRepo.findOne({
      where: { id },
      relations: ['schedule'],
    });
    if (!film) return null;
    return {
      ...film,
      tags: film.tags.split(','),
      schedule: film.schedule.map((s) => ({
        ...s,
        hall: s.hall.toString(),
        taken: s.taken.split(','),
      })),
    };
  }

  async findScheduleByFilmId(id: string) {
    const film = await this.findById(id);
    return film?.schedule ?? [];
  }

  async saveFilm(filmDto: FilmDto & { schedule: ScheduleDto[] }) {
    const film = this.filmRepo.create({
      ...filmDto,
      tags: filmDto.tags.join(','),
      schedule: filmDto.schedule.map((s) =>
        this.scheduleRepo.create({
          ...s,
          hall: parseInt(s.hall),
          taken: s.taken.join(','),
        }),
      ),
    });
    await this.filmRepo.save(film);
  }
}
