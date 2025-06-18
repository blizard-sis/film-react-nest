import { Test, TestingModule } from '@nestjs/testing';

import { mockOrderDto } from '../../test/fixtures/films.mock';

import { OrderController } from './order.controller';
import { OrderService } from './order.service';

describe('OrderController', () => {
  let controller: OrderController;

  const serviceMock = {
    create: jest.fn(),
  };

  describe('OrderController', () => {
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        controllers: [OrderController],
        providers: [{ provide: OrderService, useValue: serviceMock }],
      }).compile();

      controller = module.get<OrderController>(OrderController);
    });

    it('should be defined', () => {
      expect(controller).toBeDefined();
    });

    it('POST /order', async () => {
      const success = {
        total: 1,
        items: [{ ...mockOrderDto.tickets[0], id: 'uuid' }],
      };
      serviceMock.create.mockResolvedValue(success);

      const result = await controller.createOrder(mockOrderDto);

      expect(serviceMock.create).toHaveBeenCalledWith(mockOrderDto);
      expect(result).toEqual(success);
    });
  });
});
