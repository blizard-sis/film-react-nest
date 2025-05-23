//TODO реализовать DTO для /orders
export class CreateOrderDto {
  film: string;
  session: string;
  daytime: string;
  row: number;
  seat: number;
  price: number;
}

export class OrderResponseItemDto extends CreateOrderDto {
  id: string;
}

export class OrderResponseDto {
  total: number;
  items: OrderResponseItemDto[];
}
