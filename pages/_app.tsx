import '../app/ui/styles/globals.css'
import type { AppProps } from 'next/app'
import { useAuth } from '../app/hooks/auth.hooks'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
