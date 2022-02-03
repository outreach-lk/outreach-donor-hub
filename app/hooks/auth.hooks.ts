import { useContext } from "react";
import AuthClientFactory from "../apis/auth/client/AuthClientFactory";
import { AuthContext } from "../context/auth.context";

/**
 * All auth related functionalities are accessible through this hook.
 * Should only be used in a react context.
 * @returns 
 */
export function useAuth(){
    const client = new AuthClientFactory().getClient();
    const authCtx = useContext(AuthContext);
    client.onSessionChange(authCtx.setSession);
    return {
        ...authCtx,
        client
    }
}
