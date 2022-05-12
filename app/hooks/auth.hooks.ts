import { useContext } from "react";
import {authClientFactory} from "../api/clients";
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
    const setSession = authCtx.setSession;
    return {
        isAuthorized: authCtx.isAuthorized,
        sessionId: authCtx.sessionId,
        user: authCtx.user,
        client: {
            accessToken: client.accessToken,
            signInWithEmail: (email: string, password: string, persist?: boolean) => {
                client.signInWithEmail(email, password, persist)
                .then( session => {
                    setSession({
                        ...session,
                        isAuthorized: true
                    })
                })
                .catch((error: Error) => feedback.show( error, {
                    type: 'error',
                    title: 'Sign In Error'
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
                .catch((error: Error) => feedback.show( error, {
                    type: 'error',
                    title: 'Sign In Error'
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
                .catch((error: Error) => feedback.show( error, {
                    type: 'error',
                    title: 'Sign In Error'
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
                .catch((error: Error) => feedback.show( error, {
                    type: 'error',
                    title: 'Sign Up Error'
                }));
            },
            confirmSignup: client.confirmSignup.bind(client),
            resetPassword: (email: string) => {
                client.requestPwdReset( email )
                .then(()=> {
                    feedback.show( 'Password Reset Link has been sent to your email' ,{
                        type: 'success',
                        title: 'Password Reset'
                    })
                })
                .catch((error: Error) => feedback.show( error, {
                    type: 'error',
                    title: 'Password Reset Error'
                }));
            },
            logout: () => {
                client.logout()
                .catch((error: Error) => feedback.show( error, {
                    type: 'error',
                    title: 'Logout Error'
                }));
            },
            
        }
    }
}



