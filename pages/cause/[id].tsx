/**
 * Cause Page
 */

import { useRouter } from "next/router";
import { CauseDto } from "../../app/types/dtos/cause.dtos";
import { EntityPage } from "../../app/ui/components/layouts/pages/entity/entity.layout";

export default function CausePage(){
    const {query} = useRouter();
    return (
        <EntityPage entity="cause" id={query.id as string}>
            {
                (data: CauseDto) => {
                    return <div>
                        <p>{data.title}</p>
                        <p>{data.description}</p>
                    </div>
                }
            }
        </EntityPage>
    )
} 