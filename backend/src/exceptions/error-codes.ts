import { HttpStatus } from '@nestjs/common';

export enum ErrorCode {
  FilmNotFound = 100,
  SessionNotFound = 101,
  SeatAlreadyTaken = 102,
  DatabaseError = 103,
}

export const code2message = new Map<ErrorCode, string>([
  [ErrorCode.FilmNotFound, 'Фильм не найден'],
  [ErrorCode.SessionNotFound, 'Сеанс не найден'],
  [ErrorCode.SeatAlreadyTaken, 'Место уже занято'],
  [ErrorCode.DatabaseError, 'Ошибка базы данных'],
]);

export const code2status = new Map<ErrorCode, HttpStatus>([
  [ErrorCode.FilmNotFound, HttpStatus.BAD_REQUEST],
  [ErrorCode.SessionNotFound, HttpStatus.BAD_REQUEST],
  [ErrorCode.SeatAlreadyTaken, HttpStatus.BAD_REQUEST],
  [ErrorCode.DatabaseError, HttpStatus.INTERNAL_SERVER_ERROR],
]);
