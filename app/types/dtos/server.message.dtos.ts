/**
 * Defines base dto for messages between client & server.
 */

import {Pagable} from '../pagable';

export type ServerMessageDto<T> = {
    path: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTION',
    wasRequestAuthorized: boolean,
    serverTime: Date,
    message: string,
    code: number,
    data?: T,
    error?: T
}

export type ServerError = {
    message: string,
    code: number | string,
    stackTrace?: any
}

export type EntityCreatedDto<T> = ServerMessageDto<T>;
export type EntityFetchedDto<T> = ServerMessageDto<T>;
export type EntityFetchedPageDto<T> = ServerMessageDto<Pageable<T>>;
export type EntityCreatedDto<T> = ServerMessageDto<T>;
export type EntityUpdatedDto<T> = ServerMessageDto<T>;
export type EntityDeletedDto<T> = ServerMessageDto<T>;