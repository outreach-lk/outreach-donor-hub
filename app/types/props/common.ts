import { ReactElement } from "react";

/**
 * Renderable Child Types
 * Thanks to https://stackoverflow.com/a/60297147
 */
export type Renderable = number | string | ReactElement | Renderable[] | null