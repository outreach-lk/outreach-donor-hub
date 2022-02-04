import { useContext } from "react";
import {authClientFactory} from "../apis/";
import { AuthContext } from "../context/auth.context";


/**
 * All auth related functionalities are accessible through this hook.
 * Should only be used in a react context, ideally inside an HOC to wrap
 * client with context.
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



