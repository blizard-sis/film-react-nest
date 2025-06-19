import { Controller, Get, Logger, Param } from '@nestjs/common';
import { FilmsService } from './films.service';

@Controller('films')
export class FilmsController {
  private readonly logger = new Logger(FilmsController.name);

  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  getAll() {
    this.logger.log('Fetching all films (GET /films)');
    return this.filmsService.getAllFilms();
  }

  @Get(':id/schedule')
  getSchedule(@Param('id') id: string) {
    this.logger.log(
      `Fetching schedule for film with ID ${id} (GET /films/${id}/schedule)`,
    );
    return this.filmsService.getFilmSchedule(id);
  }
}
