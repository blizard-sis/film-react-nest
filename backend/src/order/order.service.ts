import { Injectable, Inject } from '@nestjs/common';

import { MongoRepository } from '../repository/mongo.repository';
import { PostgresRepository } from '../repository/postgres.repository';
import { ServerException } from '../exceptions/server.exceptions';
import { ErrorCode } from '../exceptions/error-codes';
import {
  CreateOrderDto,
  OrderResponseDto,
  OrderResponseItemDto,
} from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(
    @Inject('FILMS_REPOSITORY')
    private readonly repo: MongoRepository | PostgresRepository,
  ) {}

  async create(order: CreateOrderDto): Promise<OrderResponseDto> {
    const result: OrderResponseItemDto[] = [];
    for (const ticket of order.tickets) {
      const { film, session, row, seat } = ticket;
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
        ...ticket,
        id: crypto.randomUUID(),
      });

      await this.repo.saveFilm(filmItem);
    }

    return {
      total: result.length,
      items: result,
    };
  }
}
