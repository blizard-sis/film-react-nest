import { Test, TestingModule } from '@nestjs/testing';

import { mockFilm, mockSchedule } from '../../test/fixtures/films.mock';

import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';

describe('FilmsController', () => {
  let controller: FilmsController;

  const serviceMock = {
    getAllFilms: jest.fn(),
    getFilmSchedule: jest.fn(),
  };

  describe('FilmsController defined', () => {
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        controllers: [FilmsController],
        providers: [{ provide: FilmsService, useValue: serviceMock }],
      }).compile();

      controller = module.get<FilmsController>(FilmsController);
    });

    it('should be defined', () => {
      expect(controller).toBeDefined();
    });

    it('GET /films', async () => {
      const success = {
        total: 1,
        items: [mockFilm],
      };
      serviceMock.getAllFilms.mockResolvedValue(success);

      const result = await controller.getAll();

      expect(serviceMock.getAllFilms).toHaveBeenCalled();
      expect(result).toEqual(success);
    });

    it('GET /films/:id/schedule', async () => {
      const success = {
        total: mockSchedule.length,
        items: mockSchedule,
      };
      serviceMock.getFilmSchedule.mockResolvedValue(success);

      const result = await controller.getSchedule(mockFilm.id);

      expect(serviceMock.getFilmSchedule).toHaveBeenCalledWith(mockFilm.id);
      expect(result).toEqual(success);
    });
  });
});
