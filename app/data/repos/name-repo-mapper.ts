/**
 * Returns the relevant repo from entity name
 * @kulathilake
 */

import ICRUDREPO from "../../types/interfaces/crud.repo.interface";
import CauseRepo from "./cause.repo";
import UserRepo from "./user.repo";

export function getRepoFromEntityName(name: string): ICRUDREPO<any> {
    switch(name){
        default:
            throw new Error('invalid name');
        case "cause":
            return CauseRepo.getRepo();
        case "user":
            return UserRepo.getRepo();
    }
}