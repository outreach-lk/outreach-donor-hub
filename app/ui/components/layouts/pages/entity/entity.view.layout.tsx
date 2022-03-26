/**
 * Page layout & common methods for a single entity
 */

import { PropsWithChildren } from "react";
import { useEntity } from "../../../../../hooks/entity";
import { SingleEntityPageProps } from "../../../../../types/props/entity.props";

export function EntityPage(props: PropsWithChildren<SingleEntityPageProps>) {
    const {
        checkEntityPerms,
        deleteEntity,
        updateEntity,
        fetchEntity
    }  = useEntity(props.entity);

    return (
        <>
            {props.children}
        </>
    )
}