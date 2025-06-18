// src/order/order.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';

import {
  ErrorCode,
  code2message,
  code2status,
} from '../exceptions/error-codes';
import { ServerException } from '../exceptions/server.exceptions';

import {
  mockFilm,
  mockSchedule,
  mockOrderDto,
} from '../../test/fixtures/films.mock';

import { OrderService } from './order.service';

describe('OrderService', () => {
  let service: OrderService;

  const repoMock = {
    findAll: jest.fn(),
    findById: jest.fn(),
    findScheduleByFilmId: jest.fn(),
    saveFilm: jest.fn(),
  };

  let repo: jest.Mocked<typeof repoMock>;

  describe('OrderService', () => {
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

    describe('.create', () => {
      const dto = mockOrderDto;

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
