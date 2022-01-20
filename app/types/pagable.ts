/** Defines types for pagable data */

/**
 * Pagable Data Type
 * TODO: Should this rather be an interface?
 */
export type Pagable<T> = {
    total: number,
    prev: Page<[]>,
    current: Page<T>,
    next: Page<[]>
}

export type Page<T> = {
    count: number
    index: number,
    dataIndices?: {
        start: number,
        end: number
    }
    data: T[]
}