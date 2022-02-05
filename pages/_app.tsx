import '../app/ui/styles/globals.css'
import type { AppProps } from 'next/app'
import firebaseClientInit from '../app/libs/firebase.client.sdk';

/** 
 * initializes firebase client application. 
 * valid when firebase is used as a provider
 * FIXME: throws an error if configurations are not found.
 * */
firebaseClientInit();

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
