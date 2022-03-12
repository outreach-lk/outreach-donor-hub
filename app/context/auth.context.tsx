import { useRouter } from "next/router";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { getConfig } from "../config";
import { useFeedback } from "../hooks/feedback.hook";
import { LocalSession, LocalSessionContext } from "../types/dtos/auth.dtos";
import { FullScreenLoader } from "../ui/components/modules/loader";

const AuthContext = createContext<LocalSessionContext>({
  isAuthorized: false,
} as LocalSessionContext);
const { Consumer, Provider } = AuthContext;
const config = getConfig();
/**
 * Provides Authentication & Authorization Context for the Client App
 * Router Guard & Auth based redirection happens here.
 * @param props
 * @returns
 */
export function AuthProvider<P>(props: PropsWithChildren<P>) {
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
  const [showContent, setShowContent] = useState<boolean>(false);
  const { pathname, push } = useRouter();

  /**
   * Checks if the current route is authorized for the user
   * If not redirects user to sign-in
   */
  useEffect(() => {
    const route = config.routes.find((route) => route.path === pathname);
    if (route && route.isProtected && !session.isAuthorized) {
      setPostSignInPath(pathname);
      show("Please Login to Continue", {
        type: "error",
        title: "Access Denied",
      });
      push({
        pathname: "/auth/sign-in",
      });
    } else if (route && !route.isProtected) {
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
    }
  }, [postSignInPath, session.isAuthorized, push]);

  return (
    <Provider
      value={{
        ...session,
        setSession,
      }}
    >
      {showContent ? props.children : <FullScreenLoader/>}
    </Provider>
  );
}

export { AuthContext, Consumer };
