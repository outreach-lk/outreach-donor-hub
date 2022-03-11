import ICRUDREPO from "../../types/interfaces/crud.repo.interface";
import CauseRepo from "./cause.repo";
import UserRepo from "./user.repo";

/**
 * Will register all singleton repositories during application initialization
 * @kulathilake
 */
const repos = [
    UserRepo,
]
export function registerRepos(){ 
   console.log('Registering Repositories') 
   repos.forEach(repo => {
       repo.getRepo().register();
   })
}