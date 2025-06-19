import { Test, TestingModule } from '@nestjs/testing';

import { mockFilm, mockSchedule } from '../../test/fixtures/films.mock';

import { FilmsService } from './films.service';

describe('FilmsService', () => {
  let service: FilmsService;

  const repoMock = {
    findAll: jest.fn(),
    findById: jest.fn(),
    findScheduleByFilmId: jest.fn(),
    saveFilm: jest.fn(),
  };

  let repo: jest.Mocked<typeof repoMock>;

  describe('FilmsService', () => {
    beforeEach(async () => {
      jest.clearAllMocks();
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          FilmsService,
          { provide: 'FILMS_REPOSITORY', useValue: repoMock },
        ],
      }).compile();

      service = module.get<FilmsService>(FilmsService);
      repo = repoMock;
    });

    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    describe('getAllFilms', () => {
      it('should return films: total and items', async () => {
        const films = [mockFilm];
        repo.findAll.mockResolvedValue(films);

        const result = await service.getAllFilms();

        expect(repo.findAll).toHaveBeenCalled();
        expect(result).toMatchObject({
          total: films.length,
          items: films,
        });
      });
    });

    describe('getFilmSchedule', () => {
      it('should return schedule by film id: total and items', async () => {
        const filmId = mockFilm.id;
        repo.findScheduleByFilmId.mockResolvedValue(mockSchedule);

        const result = await service.getFilmSchedule(filmId);

        expect(repo.findScheduleByFilmId).toHaveBeenCalledWith(filmId);
        expect(result).toMatchObject({
          total: mockSchedule.length,
          items: mockSchedule,
        });
      });
    });
  });
});
