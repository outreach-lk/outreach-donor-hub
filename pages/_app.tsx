import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import firebaseClientInit from '../app/libs/firebase.client.sdk'

if(typeof window !== 'undefined'){
  firebaseClientInit();
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp