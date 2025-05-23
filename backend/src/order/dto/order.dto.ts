//TODO реализовать DTO для /orders
export class CreateOrderDto {
  filmId: string;
  scheduleId: string;
  seat: {
    row: number;
    seat: number;
  };
}
