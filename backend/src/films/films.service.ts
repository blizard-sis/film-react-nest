import { Injectable } from '@nestjs/common';
import { FilmDto, ScheduleDto } from './dto/films.dto';

@Injectable()
export class FilmsService {
  getAllFilms(): { total: number; items: FilmDto[] } {
    return {
      total: 0,
      items: [],
    };
  }

  getFilmSchedule(id: string): { total: number; items: ScheduleDto[] } {
    return {
      total: 0,
      items: [],
    };
  }
}
