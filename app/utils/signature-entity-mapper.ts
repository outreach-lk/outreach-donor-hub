import BaseEntity from "../data/entities/base.entity";
import Cause from "../data/entities/cause.entity";
import { EntitySignature } from "./api-route-info";
import { CauseDto } from "../types/dtos/cause.dtos";

/**
 * Fetches an entity based on an entity signature object.
 * @param signature 
 * @returns 
 */
export async function fetchEntityFromSignature(signature: EntitySignature): Promise<BaseEntity<any,any>> {
    let dto: any;
    switch(signature.entityType){
        default:
            throw new Error('invalid_entity_type');
        case('cause'):
            dto = (await Cause.get(signature.entityId)).data;
            if( dto ){
                return new Cause(dto as CauseDto);
            }else {
                throw new Error('error_fetching_cause');
            }
    }
}