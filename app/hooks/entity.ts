/**
 * This hook is to be used by components and pages that are related to entities.
 * The hook is responsible for fetching entity data, calling create APIs, updating,
 * deleting & client side permission checking.
 * @kulathilake
 * @since 27/03/2022
 */

import { Page } from "../types/pagable";
import { getRepoFromEntityName } from "../utils/name-repo-mapper"
import { useFeedback } from "./feedback.hook";
import { useLogger } from "./logger.hooks";

/**
 * A hook that performs common actions and checks on entities
 * @param entity valid entity name
 */
export function useEntity(entity: string) {
    const entityDisplayName = `${entity[0].toUpperCase()}${entity.slice(1)}`
    const {show} = useFeedback();
    const logger = useLogger();
    const repo = getRepoFromEntityName(entity);
    return {
        fetchEntity: (id:string)=>{
            return repo.get(id)
            .catch((error:Error) => {
                logger.log(error);
                show(error,{
                    type:"error",
                    title: `${entityDisplayName} Fetch Error`
                });
                throw error;
            })
        },
        fetchEntityPage: (page: Page,queryMap?:Map<string,string|number>)=>{
            return repo.getPage(page,queryMap)
            .catch(error => {
                logger.log(error);
                show(error.message as string,{
                    type: "error",
                    title: `${entityDisplayName} Fetch Error`
                });
                throw error;
            })
        },
        createEntity: <T>(data: T)=>{
            return repo.create(data)
            .catch((error:Error)=>{
                logger.log(error);
                show(error,{
                    type: 'error',
                    title: `${entityDisplayName} Create Error`
                });
                throw error;
            })
        },
        updateEntity: <T>(id:string, data:T)=>{
            return repo.update(id,data)
            .catch((error: Error)=>{
                logger.log(error);
                show(error,{
                    type:'error',
                    title: `${entityDisplayName} Update Error`
                });
                throw error;

            })
        },
        deleteEntity: (id: string)=>{
            return repo.delete(id)
            .catch((error: Error)=>{
                logger.log(error);
                show(error,{
                    type:'error',
                    title: `${entityDisplayName} Delete Error`
                });
                throw error;
            })
        },
        checkEntityPerms: ()=> {
            return {
                isOwner: false,
                canRead: false,
                canUpdate: false,
                canDelete: false, 
            }
        }

    }
}