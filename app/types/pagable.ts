/** Defines types for pagable data */

/**
 * Pagable Data Type
 * TODO: Should this rather be an interface?
 */
export type Pagable<T> = {
    total: number,
    prev: Page<T>,
    current: Page<T>,
    next: Page<T>
}

export type Page<T> = {
    count: number
    index: number,
    dataIndices?: {
        start: number,
        end: number
    }
    data?: T[]
}