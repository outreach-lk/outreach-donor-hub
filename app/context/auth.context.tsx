import { createContext, PropsWithChildren, useState } from 'react'
import { LocalSession, LocalSessionContext } from '../types/dtos/auth.dtos';
const AuthContext = createContext<LocalSessionContext>({isAuthorized: false} as LocalSessionContext);
const {Consumer, Provider} = AuthContext;

export function AuthProvider<P>(props: PropsWithChildren<P>){
    const [session,setSession] = useState<LocalSession>({isAuthorized: false} as LocalSession);

    return (    
        <Provider value={{
            ...session,
            setSession
        }}>
            {props.children}
        </Provider>
    )
}

export {AuthContext, Consumer};