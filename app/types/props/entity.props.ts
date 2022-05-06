import { ReactElement } from "react"
import { Page } from "../pagable"
import { Renderable } from "./common"

/**
 * Props Related Common Entity Components.
 */
export type EntityPageProps  = {
    entity: string
    children: (data:any)=> Renderable | Renderable 
}

export type SingleEntityPageProps<T> = EntityPageProps & {
    id: string,
    entity: T
}

export type EntityListPageProps = EntityPageProps & {
    page?: Page
}

