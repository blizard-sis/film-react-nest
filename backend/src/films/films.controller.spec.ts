import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';

describe('FilmsController', () => {
  let controller: FilmsController;
  describe('FilmsController defined', () => {
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        controllers: [FilmsController],
        providers: [
          FilmsService,
          {
            provide: 'FILMS_REPOSITORY',
            useValue: {
              findAll: jest.fn(),
              findById: jest.fn(),
              findScheduleByFilmId: jest.fn(),
              saveFilm: jest.fn(),
            },
          },
        ],
      }).compile();

      controller = module.get<FilmsController>(FilmsController);
    });

    it('should be defined', () => {
      expect(controller).toBeDefined();
    });
  });
});
