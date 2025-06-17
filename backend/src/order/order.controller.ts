import { Controller, Post, Body, Logger } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/order.dto';

@Controller('order')
export class OrderController {
  private readonly logger = new Logger(OrderController.name);

  constructor(private readonly orderService: OrderService) {}

  @Post()
  createOrder(@Body() dto: CreateOrderDto) {
    this.logger.log(
      `Creating order (POST /order with data: ${JSON.stringify(dto)})`,
    );
    return this.orderService.create(dto);
  }
}
