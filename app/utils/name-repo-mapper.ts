/**
 * Returns the relevant repo from entity name
 * @kulathilake
 */

import ICRUDREPO from "../types/interfaces/crud.repo.interface";
import CauseRepo from "../data/repos/cause.repo";
import UserRepo from "../data/repos/user.repo";
import EventRepo from "../data/repos/event.repo";

export function getRepoFromEntityName(name: string): ICRUDREPO<any> {
    switch(name){
        default:
            throw new Error('invalid name');
        case "cause":
            return CauseRepo.getRepo();
        case "user":
            return UserRepo.getRepo();
        case "event":
            return EventRepo.getRepo();
    }
}