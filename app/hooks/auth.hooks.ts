import { useContext } from "react";
import {authClientFactory} from "../adapters/clients";
import { AuthContext } from "../context/auth.context";
import { UserRole } from "../types/dtos/user.dtos";
import { AuthProvider } from "../types/enums/providers";
import { IAuthClient } from "../types/interfaces/auth.client.interface";
import { useFeedback } from "./feedback.hook";
import { useLogger } from "./logger.hooks";


/**
 * All auth related functionalities are accessible through this hook.
 * Should only be used in a react context, ideally inside an HOC to wrap
 * client with context.
 * @returns 
 * @version 1.0.0b Uses Firebase as the Auth Provider
 */
export function useAuth(){
    const client = authClientFactory.getClient(AuthProvider.FIREBASE);
    const authCtx = useContext(AuthContext);
    const feedback = useFeedback();
    const logger = useLogger();
    const setSession = authCtx.setSession;
    return {
        isAuthorized: authCtx.isAuthorized,
        sessionId: authCtx.sessionId,
        user: authCtx.user,
        client: {
            signInWithEmail: (email: string, password: string, persist?: boolean) => {
                client.signInWithEmail(email, password, persist)
                .then( session => {
                    setSession({
                        ...session,
                        isAuthorized: true
                    })
                })
                .catch((error) => feedback.show( error, {
                    type: 'error',
                }));
            },
            signInWithGoogle: () => {
                client.signInWithGoogle()
                .then( session => {
                    setSession({
                        ...session,
                        isAuthorized: true
                    })
                })
                .catch((error) => feedback.show( error, {
                    type: 'error',
                }));

            },
            signInWithFacebook: () => {
                client.signInWithFacebook()
                .then( session => {
                    setSession({
                        ...session,
                        isAuthorized: true
                    })
                })
                .catch((error) => feedback.show( error, {
                    type: 'error',
                }));
            },
            signUpWithEmail: (email:string, password: string, role: UserRole) => {
                client.signUpWithEmail(email, password, role)
                .then( session => {
                    setSession({
                        ...session,
                        isAuthorized: true
                    })
                })
                .catch((error) => feedback.show( error, {
                    type: 'error',
                }));
            },
            confirmSignup: client.confirmSignup.bind(client),
            
        }
    }
}



