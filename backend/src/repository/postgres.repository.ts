import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Film } from '../films/film.entity';
import { Schedule } from '../schedule/schedule.entity';

@Injectable()
export class PostgresRepository {
  constructor(
    @InjectRepository(Film)
    private filmRepo: Repository<Film>,
    @InjectRepository(Schedule)
    private scheduleRepo: Repository<Schedule>,
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

  async saveFilm(film: Film): Promise<Film> {
    return this.filmRepo.save(film);
  }

  async saveSchedule(session: Schedule): Promise<Schedule> {
    return this.scheduleRepo.save(session);
  }
}
