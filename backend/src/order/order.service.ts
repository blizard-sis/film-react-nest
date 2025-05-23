import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  private orders: CreateOrderDto[] = [];

  create(order: CreateOrderDto) {
    this.orders.push(order);
    return {
      message: 'Заказ создан (заглушка)',
      order,
    };
  }
}
