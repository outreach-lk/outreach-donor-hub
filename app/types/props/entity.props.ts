import { Page } from "../pagable"

/**
 * Props Related Common Entity Components.
 */
export type EntityPageProps  = {
    entity: string
}

export type SingleEntityPageProps = EntityPageProps & {
    id: string
}

export type EntityListPageProps = EntityPageProps & {
    page: Page
}