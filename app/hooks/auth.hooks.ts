import { useContext } from "react";
import {authClientFactory} from "../apis/";
import { AuthContext } from "../context/auth.context";
import { LocalSession, LocalSessionContext, SessionDto } from "../types/dtos/auth.dtos";
import { UserRole } from "../types/dtos/user.dtos";
import { AuthProvider } from "../types/enums/providers";
import { IAuthClient } from "../types/interfaces/auth.client.interface";

/**
 * All auth related functionalities are accessible through this hook.
 * Should only be used in a react context.
 * @returns 
 */
export function useAuth(){
    const client = authClientFactory.getClient();
    const authCtx = useContext(AuthContext);
    return {
        ...authCtx,
        client: client
    }
}



