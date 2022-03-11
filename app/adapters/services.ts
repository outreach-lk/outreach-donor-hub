import AuthServiceFactory from "./auth/service/auth.service.factory";
import DatabaseServiceFactory from "./database/service/db.service.factory";

export const authServiceFactory = new AuthServiceFactory();
export const databaseServiceFactory = new DatabaseServiceFactory();


