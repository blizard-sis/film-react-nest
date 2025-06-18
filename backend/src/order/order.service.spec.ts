// src/order/order.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';

import { FilmDto, ScheduleDto } from '../films/dto/films.dto';
import {
  ErrorCode,
  code2message,
  code2status,
} from '../exceptions/error-codes';
import { ServerException } from '../exceptions/server.exceptions';

import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/order.dto';

describe('OrderService', () => {
  let service: OrderService;

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

  describe('OrderService defined', () => {
    beforeEach(async () => {
      jest.clearAllMocks();
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          OrderService,
          { provide: 'FILMS_REPOSITORY', useValue: repoMock },
        ],
      }).compile();

      service = module.get<OrderService>(OrderService);
      repo = repoMock;
    });

    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('OrderService methods', () => {
    beforeEach(async () => {
      jest.clearAllMocks();
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          OrderService,
          { provide: 'FILMS_REPOSITORY', useValue: repoMock },
        ],
      }).compile();

      service = module.get<OrderService>(OrderService);
      repo = repoMock;
    });

    describe('.create', () => {
      const dto: CreateOrderDto = {
        email: 'el@mail.ru',
        phone: '+79876543210',
        tickets: [
          {
            film: mockFilm.id,
            session: mockSchedule[0].id,
            row: 2,
            seat: 3,
            price: mockSchedule[0].price,
            daytime: mockSchedule[0].daytime,
          },
        ],
      };

      it('should create an order successfully', async () => {
        repo.findById.mockResolvedValue({
          ...mockFilm,
          schedule: mockSchedule,
        });
        const result = await service.create(dto);

        expect(result.total).toBe(1);
        expect(result.items[0]).toMatchObject({
          ...dto.tickets[0],
          id: expect.any(String),
        });
        expect(repo.saveFilm).toHaveBeenCalled;
        expect(repo.saveFilm).toHaveBeenCalledWith({
          ...mockFilm,
          schedule: [
            {
              ...mockSchedule[0],
              taken: ['2:3'],
            },
          ],
        });
      });

      it('should throw FilmNotFound if film missing', async () => {
        repo.findById.mockResolvedValue(null);
        await expect(service.create(dto)).rejects.toBeInstanceOf(
          ServerException,
        );
        await expect(service.create(dto)).rejects.toMatchObject({
          response: { error: code2message.get(ErrorCode.FilmNotFound) },
          status: code2status.get(ErrorCode.FilmNotFound),
        });
      });

      it('should throw SessionNotFound if session missing', async () => {
        repo.findById.mockResolvedValue({ ...mockFilm, schedule: [] });
        await expect(service.create(dto)).rejects.toMatchObject({
          response: { error: code2message.get(ErrorCode.SessionNotFound) },
          status: code2status.get(ErrorCode.SessionNotFound),
        });
      });

      it('should throw SeatAlreadyTaken if place already taken', async () => {
        repo.findById.mockResolvedValue({
          ...mockFilm,
          schedule: [{ ...mockSchedule[0], taken: ['2:3'] }],
        });
        await expect(service.create(dto)).rejects.toMatchObject({
          response: { error: code2message.get(ErrorCode.SeatAlreadyTaken) },
          status: code2status.get(ErrorCode.SeatAlreadyTaken),
        });
      });
    });
  });
});
