/** Defines types for pagable data */

/**
 * Pagable Data Type
 * TODO: Should this rather be an interface?
 */
export type Pagable<T> = {
  total: number;
  prev: Page;
  current: Page;
  next: Page;
  data: T[]

};

export type Page = {
  pageId?: number;
  start: number | string; 
  limit: number;
};
