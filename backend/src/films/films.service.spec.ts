import { Test, TestingModule } from '@nestjs/testing';
import { FilmsService } from './films.service';
import { FilmDto, ScheduleDto } from './dto/films.dto';

describe('FilmsService', () => {
  let service: FilmsService;

  const repoMock = {
    findAll: jest.fn(),
    findById: jest.fn(),
    findScheduleByFilmId: jest.fn(),
    saveFilm: jest.fn(),
  };

  let repo: jest.Mocked<typeof repoMock>;

  const mockFilm: FilmDto = {
    id: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
    rating: 2.9,
    director: 'Итан Райт',
    tags: ['Документальный'],
    image: '/bg1s.jpg',
    cover: '/bg1c.jpg',
    title: 'Архитекторы общества',
    about:
      'Документальный фильм, исследующий влияние искусственного интеллекта на общество и этические, философские и социальные последствия технологии.',
    description:
      'Документальный фильм Итана Райта исследует влияние технологий на современное общество, уделяя особое внимание роли искусственного интеллекта в формировании нашего будущего. Фильм исследует этические, философские и социальные последствия гонки технологий ИИ и поднимает вопрос: какой мир мы создаём для будущих поколений.',
  };

  const mockSchedule: ScheduleDto[] = [
    {
      id: 'f2e429b0-685d-41f8-a8cd-1d8cb63b99ce',
      daytime: '2024-06-28T10:00:53+03:00',
      hall: '0',
      rows: 5,
      seats: 10,
      price: 350,
      taken: [],
    },
  ];

  describe('FilmsService defined', () => {
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
  });

  describe('FilmsService methods', () => {
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
