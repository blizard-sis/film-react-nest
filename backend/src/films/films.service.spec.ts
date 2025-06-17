import { Test, TestingModule } from '@nestjs/testing';
import { FilmsService } from './films.service';

describe('FilmsService', () => {
  let service: FilmsService;

  describe('FilmsService defined', () => {
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
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

      service = module.get<FilmsService>(FilmsService);
    });

    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });
});
