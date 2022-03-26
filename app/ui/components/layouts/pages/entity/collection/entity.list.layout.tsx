/**
 * Page layout & common methods for paginated entity lists.
 */

import { PropsWithChildren } from "react";
import { useEntity } from "../../../../../../hooks/entity";
import { EntityListPageProps } from "../../../../../../types/props/entity.props";

export function EntityListPage(props: PropsWithChildren<EntityListPageProps>){
    const {
        fetchEntityPage,
        createEntity
    } = useEntity(props.entity);
    return (
        <>
            {props.children}
        </>
    )
}