import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Film } from '../films/film.entity';
import { Schedule } from '../schedule/schedule.entity';

@Injectable()
export class PgFilmsRepository {
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
    return this.filmRepo.findOne({ where: { id } });
  }

  async findScheduleByFilmId(id: string) {
    const film = await this.findById(id);
    return film?.schedule ?? [];
  }
}
