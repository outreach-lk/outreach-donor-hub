/**
 * Provides Authentication & Authorization Context for the Client App
 * Router Guard & Auth/Permission based redirection happens here.
 * @author Shehan Kulathilake.
 */
import { useRouter } from "next/router";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { getConfig } from "../config";
import { useFeedback } from "../hooks/feedback.hook";
import { LocalSession, LocalSessionContext } from "../types/dtos/auth.dtos";
import { UserRole } from "../types/dtos/user.dtos";
import { FullScreenLoader } from "../ui/components/modules/loader";

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
  /**
   * Path to push back to once user has successfully signed-in
   * 1. Regular users should redirect to home TODO
   * 2. Mods & Admins should redirect to mod dashboard. TODO
   */
  const [postSignInPath, setPostSignInPath] = useState<string | null>(null);
  /**
   * Gate keeps content from loading until route permissions have been resolved.
   * Shows the loader instead.
   */
  const [showContent, setShowContent] = useState<boolean>(false);

  /**
   * Checks if the current route is authorized for the user
   * If not redirects user to sign-in
   */
  useEffect(() => {
    const route = config.routes.find((route) => route.path === pathname);
    setShowContent(false);
    if (route && route.isProtected && !session.isAuthorized) {
      setPostSignInPath(pathname);
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
  }, [pathname, session.isAuthorized]);

  /**
   * Once the user Signs-in redirect back to
   * 1. Post SignIn Path if Post SignIn Path exists
   * 2. Home page if the user is a regular
   * 3. Mod Dashboard if the user is a mod or an admin.
   */
  useEffect(() => {
    if (session.isAuthorized && postSignInPath) {
      setPostSignInPath(null);
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postSignInPath, session.isAuthorized, push]);

  return (
    <Provider
      value={{
        ...session,
        setSession,
      }}
    >
      {showContent ? props.children : <FullScreenLoader />}
    </Provider>
  );
}

export { AuthContext, Consumer };
