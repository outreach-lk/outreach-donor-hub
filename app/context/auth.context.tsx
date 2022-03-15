/**
 * Provides Authentication & Authorization Context for the Client App
 * Router Guard & Auth/Permission based redirection happen here.
 * @author Shehan Kulathilake.
 */
import { useRouter } from "next/router";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { authClientFactory } from "../adapters/clients";
import { getConfig } from "../config";
import { useFeedback } from "../hooks/feedback.hook";
import { LocalSession, LocalSessionContext } from "../types/dtos/auth.dtos";
import { UserRole } from "../types/dtos/user.dtos";
import { FullScreenLoader } from "../ui/components/modules/loader";
import { AuthProvider as AProvider } from "../types/enums/providers"


const AuthContext = createContext<LocalSessionContext>({
  isAuthorized: false,
} as LocalSessionContext);
const { Consumer, Provider } = AuthContext;
const config = getConfig();
export function AuthProvider<P>(props: PropsWithChildren<P>) {
  const { pathname, push } = useRouter();
  const [session, setSession] = useState<LocalSession>({
    isAuthorized: false,
  } as LocalSession);
  const { show } = useFeedback();
  const client = authClientFactory.getClient( AProvider.FIREBASE );
  /**
   * Path to push back to once user has successfully signed-in
   * 1. Regular users should redirect to home TODO
   * 2. Mods & Admins should redirect to mod dashboard. TODO
   */
  const [postSignInPath, setPostSignInPath] = useState<string | null>(null);
  /**
   * Gatekeeps content from loading until route permissions have been resolved.
   * Shows the loader instead.
   */
  const [showContent, setShowContent] = useState<boolean>(false);
  const [checkingPersistedSession,setCheckingStatus] = useState<boolean>(true);

  useEffect(()=>{
    const listenerSub = client.listenToAuthChanges().subscribe({
      next(session){
        if(session) {
          setSession(session);
        }else {
          setSession({isAuthorized: false} as LocalSession);
        }
        setCheckingStatus(false);
      }
    })
    return () => {
      listenerSub.unsubscribe();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  /**
   * Checks if the current route is authorized for the user
   * If not redirects user to sign-in
   */
  useEffect(() => {
    // sets current path as post sign-in path unless it's auth
    if( !pathname.match('auth' ) ){
      setPostSignInPath(pathname);
    }
    // Do not proceed unless checks for persisted sessions are done.
    if( checkingPersistedSession ) return;
    const route = config.routes.find((route) => route.path === pathname);
    // Halt rendering children until authorization checks are done.
    setShowContent(false);
    if (route && route.isProtected && !session.isAuthorized) {
      show("Please Login to Continue", {
        type: "error",
        title: "Access Denied",
      });
      push({
        pathname: "/auth/sign-in",
      });
    } else {
        setShowContent(true);
    }
    //TODO: also check permissions here.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, session.isAuthorized, checkingPersistedSession]);

  /**
   * Once the user Signs-in redirect back to
   * 1. Post SignIn Path if Post SignIn Path exists
   * 2. Home page if the user is a regular
   * 3. Mod Dashboard if the user is a mod or an admin.
   * also persist the session, if the session is valid.
   */
  useEffect(() => {
    if( session && session.sessionId ){
      client.persistSession( session );
      if (session.isAuthorized && postSignInPath) {
        push({
          pathname: postSignInPath,
        });
      } else if ( session.isAuthorized && session.user ) {
        if( session.user.role = UserRole.REGULAR ){
          push({
            pathname: '/'
          })
        } else if ( session.user.role === UserRole.ADMIN || session.user.role === UserRole.MODERATOR ){
          push({
            pathname: '/mod'
          })
        }
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postSignInPath, session]);

  return (
    <Provider
      value={{
        ...session,
        setSession,
      }}
    >
      <button onClick={client.logout.bind(client)}>logout</button>
      {showContent ? props.children : <FullScreenLoader />}
    </Provider>
  );
}

export { AuthContext, Consumer };
