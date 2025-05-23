import { Injectable } from '@nestjs/common';
import { FilmDto, ScheduleDto } from './dto/films.dto';

@Injectable()
export class FilmsService {
  private films: FilmDto[] = [
    {
      id: '1',
      title: 'Фильм 1',
      description: 'Описание 1',
      releaseDate: '2024-01-01',
    },
    {
      id: '2',
      title: 'Фильм 2',
      description: 'Описание 2',
      releaseDate: '2024-02-01',
    },
  ];

  private schedules: Record<string, ScheduleDto[]> = {
    '1': [
      {
        id: 's1',
        date: '2025-06-01',
        time: '18:00',
      },
    ],
    '2': [],
  };

  getAllFilms(): FilmDto[] {
    return this.films;
  }

  getFilmSchedule(id: string): FilmDto & { schedule: ScheduleDto[] } {
    const film = this.films.find((f) => f.id === id);
    const schedule = this.schedules[id] || [];
    return { ...film, schedule };
  }
}
