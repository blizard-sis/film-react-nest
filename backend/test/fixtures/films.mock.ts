import { FilmDto, ScheduleDto } from '../../src/films/dto/films.dto';
import { CreateOrderDto } from '../../src/order/dto/order.dto';

export const mockFilm: FilmDto = {
  id: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
  rating: 2.9,
  director: 'Итан Райт',
  tags: ['Документальный'],
  image: '/bg1s.jpg',
  cover: '/bg1c.jpg',
  title: 'Архитекторы общества',
  about:
    'Документальный фильм, исследующий влияние искусственного интеллекта на общество и этические, философские и социальные последствия технологии.',
  description:
    'Документальный фильм Итана Райта исследует влияние технологий на современное общество…',
};

export const mockSchedule: ScheduleDto[] = [
  {
    id: 'f2e429b0-685d-41f8-a8cd-1d8cb63b99ce',
    daytime: '2024-06-28T10:00:53+03:00',
    hall: '0',
    rows: 5,
    seats: 10,
    price: 350,
    taken: [],
  },
];

export const mockOrderDto: CreateOrderDto = {
  email: 'el@mail.ru',
  phone: '+79876543210',
  tickets: [
    {
      film: mockFilm.id,
      session: mockSchedule[0].id,
      row: 2,
      seat: 3,
      price: mockSchedule[0].price,
      daytime: mockSchedule[0].daytime,
    },
  ],
};
