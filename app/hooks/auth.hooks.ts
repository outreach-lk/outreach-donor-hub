import { useContext } from "react";
import {authClientFactory} from "../apis/clients";
import { AuthContext } from "../context/auth.context";
import { AuthProvider } from "../types/enums/providers";
import { IAuthClient } from "../types/interfaces/auth.client.interface";
import { useFeedback } from "./feedback.hook";
import { useLogger } from "./logger.hook";


/**
 * All auth related functionalities are accessible through this hook.
 * Should only be used in a react context, ideally inside an HOC to wrap
 * client with context.
 * @returns 
 */
export function useAuth(){
    const client = authClientFactory.getClient(AuthProvider.FIREBASE);
    const authCtx = useContext(AuthContext);
    const feedback = useFeedback()
    const logger = useLogger();
    const setSession = authCtx.setSession;
    return {
        isAuthorized: authCtx.isAuthorized,
        sessionId: authCtx.sessionId,
        user: authCtx.user,
        client: {
            signInWithEmail: client.signInWithEmail.bind(client),
            signInWithGoogle: client.signInWithGoogle.bind(client),
            signInWithFacebook: client.signInWithFacebook.bind(client),
            signUpWithEmail: client.signUpWithEmail.bind(client),
            confirmSignup: client.confirmSignup.bind(client),
            
        }
    }
}



