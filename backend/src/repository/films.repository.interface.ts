import { FilmDto, ScheduleDto } from '../films/dto/films.dto';

export interface IFilmsRepository {
  findAll(): Promise<FilmDto[]>;
  findById(id: string): Promise<(FilmDto & { schedule: ScheduleDto[] }) | null>;
  findScheduleByFilmId(filmId: string): Promise<ScheduleDto[]>;
  saveFilm(film: FilmDto & { schedule: ScheduleDto[] }): Promise<void>;
}
