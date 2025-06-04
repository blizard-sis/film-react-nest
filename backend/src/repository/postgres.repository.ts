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

  async findAll(): Promise<Film[]> {
    return this.filmRepo.find({ relations: ['schedule'] });
  }

  async findById(id: string): Promise<Film | null> {
    return this.filmRepo.findOne({ where: { id }, relations: ['schedule'] });
  }

  async findScheduleByFilmId(id: string): Promise<Schedule[]> {
    const film = await this.findById(id);
    return film?.schedule ?? [];
  }
}
