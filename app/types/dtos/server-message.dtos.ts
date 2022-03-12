/**
 * Defines base dto for messages between client & server.
 */

import { Pagable } from "../pagable";

export type ServerMessageDto<T> = {
  path: string;
  method: string;
  wasRequestAuthorized: boolean;
  serverTime: Date;
  message?: string;
  code?: number | string;
  data?: T;
  error?: any;
};

export type ServerError = {
  message: string;
  code: number | string;
  stackTrace?: any;
};

export type EntityCreatedDto<T> = ServerMessageDto<T>;
export type EntityFetchedDto<T> = ServerMessageDto<T>;
export type EntityFetchedPageDto<T> = ServerMessageDto<Pagable<T>>;
export type EntityUpdatedDto<T> = ServerMessageDto<T>;
export type EntityDeletedDto<T> = ServerMessageDto<T>;
