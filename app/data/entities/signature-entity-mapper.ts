import BaseEntity from "./base.entity";
import Cause from "./cause.entity";
import CauseRepo from "../repos/cause.repo";
import ICRUDREPO from "../../types/interfaces/crud.repo.interface";
import { EntitySignature } from "../../utils/api-route-info";

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
            dto = await Cause.get(signature.entityId); 
            return new Cause(dto);
    }
}