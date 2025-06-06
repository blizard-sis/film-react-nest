import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { FilmEntity } from '../films/film.entity';
import { ScheduleEntity } from '../schedule/schedule.entity';

@Injectable()
export class PostgresRepository {
  constructor(
    @InjectRepository(FilmEntity)
    private filmRepo: Repository<FilmEntity>,
    @InjectRepository(ScheduleEntity)
    private scheduleRepo: Repository<ScheduleEntity>,
  ) {}

  async findAll() {
    return this.filmRepo.find();
  }

  async findById(id: string) {
    return this.filmRepo.findOne({
      where: { id },
      relations: ['schedule'],
    });
  }

  async findScheduleByFilmId(id: string) {
    const film = await this.findById(id);
    return film?.schedule ?? [];
  }

  async saveFilm(film: FilmEntity): Promise<FilmEntity> {
    return this.filmRepo.save(film);
  }

  async saveSchedule(session: ScheduleEntity): Promise<ScheduleEntity> {
    return this.scheduleRepo.save(session);
  }
}
