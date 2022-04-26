
import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import { AuthProvider } from '../app/context/auth.context'
import { FeedbackProvider } from '../app/context/feedback.context';
import '../app/ui/components/elements/wyswyg-editor/wysiwyg-editor.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
        <FeedbackProvider>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </FeedbackProvider>
    </ChakraProvider>
  )
}

export default MyApp