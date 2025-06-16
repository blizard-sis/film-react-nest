import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { FilmEntity } from '../films/film.entity';
import { ScheduleEntity } from '../schedule/schedule.entity';
import { FilmDto, ScheduleDto } from '../films/dto/films.dto';
import { ServerException } from '../exceptions/server.exceptions';
import { ErrorCode } from '../exceptions/error-codes';

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
    try {
      const films = await this.filmRepo.find({ relations: ['schedule'] });
      return films.map((film) => ({
        ...film,
        tags: film.tags.split(','),
      }));
    } catch (error) {
      throw new ServerException(ErrorCode.DatabaseError, 'findAll');
    }
  }

  async findById(
    id: string,
  ): Promise<(FilmDto & { schedule: ScheduleDto[] }) | null> {
    try {
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
    } catch (error) {
      throw new ServerException(ErrorCode.DatabaseError, 'findById');
    }
  }

  async findScheduleByFilmId(id: string) {
    try {
      const film = await this.findById(id);
      return film?.schedule ?? [];
    } catch (error) {
      throw new ServerException(
        ErrorCode.DatabaseError,
        'findScheduleByFilmId',
      );
    }
  }

  async saveFilm(filmDto: FilmDto & { schedule: ScheduleDto[] }) {
    try {
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
    } catch (error) {
      throw new ServerException(ErrorCode.DatabaseError, 'saveFilm');
    }
  }
}
