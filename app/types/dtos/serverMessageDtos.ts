/**
 * Defines base dto for messages between client & server.
 */

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