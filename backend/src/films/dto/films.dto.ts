//TODO описать DTO для запросов к /films
export class FilmDto {
  id: string;
  title: string;
  description: string;
  releaseDate: string;
}

export class ScheduleDto {
  id: string;
  date: string;
  time: string;
}
