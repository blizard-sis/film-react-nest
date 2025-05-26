import { Controller, Post, Body } from '@nestjs/common';
import { OrderService } from './order.service';
import { TicketDto } from './dto/order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  createOrder(@Body() dto: TicketDto[]) {
    return this.orderService.create(dto);
  }
}
