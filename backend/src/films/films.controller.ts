import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  getAll() {
    return this.filmsService.getAllFilms();
  }

  @Get(':id/schedule')
  getSchedule(@Param('id') id: string) {
    return this.filmsService.getFilmSchedule(id);
  }
}
