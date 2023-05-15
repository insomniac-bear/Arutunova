import { HttpStatus } from '@nestjs/common';

export enum ErrorCode {
  LoginOrPasswordIncorrect = 100,
  UserAlreadyExist = 101,
  AccessDenied = 102,
  UserNotFound = 103,
  UsersNotFound = 104,
  BadFile = 105,
  NoRightsForEdit = 106,
  NoRightsForRemove = 107,
  ValidationError = 112,
}

export const code2message = new Map<ErrorCode, string>([
  [ErrorCode.LoginOrPasswordIncorrect, 'Некорректная пара логин-пароль'],
  [ErrorCode.UserAlreadyExist, 'Такой пользователь уже существует'],
  [ErrorCode.AccessDenied, 'Доступ запрещен'],
  [ErrorCode.UserNotFound, 'Пользователь не найден'],
  [ErrorCode.UsersNotFound, 'Поиск пользователей не дал результатов'],
  [ErrorCode.NoRightsForEdit, 'Недостаточно прав для редактирования'],
  [ErrorCode.NoRightsForRemove, 'Недостаточно прав для удаления'],
  [ErrorCode.ValidationError, 'Переданы некоректные значения'],
  [ErrorCode.BadFile, 'Ошибка загрузки файла'],
]);

export const code2status = new Map<ErrorCode, HttpStatus>([
  [ErrorCode.LoginOrPasswordIncorrect, HttpStatus.BAD_REQUEST],
  [ErrorCode.UserAlreadyExist, HttpStatus.BAD_REQUEST],
  [ErrorCode.AccessDenied, HttpStatus.FORBIDDEN],
  [ErrorCode.UserNotFound, HttpStatus.NOT_FOUND],
  [ErrorCode.UsersNotFound, HttpStatus.NOT_FOUND],
  [ErrorCode.NoRightsForEdit, HttpStatus.FORBIDDEN],
  [ErrorCode.NoRightsForRemove, HttpStatus.FORBIDDEN],
  [ErrorCode.ValidationError, HttpStatus.BAD_REQUEST],
  [ErrorCode.BadFile, HttpStatus.NOT_FOUND],
]);
