import { Injectable } from '@nestjs/common';

import { FilmsRepository } from '../repository/films.repository';
import { ServerException } from '../exceptions/server.exceptions';
import { ErrorCode } from '../exceptions/error-codes';
import {
  CreateOrderDto,
  OrderResponseDto,
  OrderResponseItemDto,
} from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly repo: FilmsRepository) {}

  async create(orders: CreateOrderDto): Promise<OrderResponseDto> {
    const result: OrderResponseItemDto[] = [];
    for (const order of orders.tickets) {
      const { film, session, row, seat } = order;
      const place = `${row}:${seat}`;

      const filmItem = await this.repo.findById(film);
      if (!filmItem) throw new ServerException(ErrorCode.FilmNotFound);

      const sessionItem = filmItem.schedule.find((s) => s.id === session);
      if (!sessionItem) throw new ServerException(ErrorCode.SessionNotFound);

      if (sessionItem.taken.includes(place)) {
        throw new ServerException(ErrorCode.SeatAlreadyTaken);
      }

      sessionItem.taken.push(place);

      result.push({
        ...order,
        id: crypto.randomUUID(),
      });

      await filmItem.save();
    }

    return {
      total: result.length,
      items: result,
    };
  }
}
