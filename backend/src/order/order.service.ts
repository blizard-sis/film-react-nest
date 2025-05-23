import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  create(order: CreateOrderDto): { total: number; items: CreateOrderDto[] } {
    return {
      total: 0,
      items: [],
    };
  }
}
