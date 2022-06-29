
import { ChakraProvider } from '@chakra-ui/react'
import { NextSeo } from 'next-seo';
import { AppProps } from 'next/app'
import { getConfig } from '../app/config';
import { AuthProvider } from '../app/context/auth.context'
import { FeedbackProvider } from '../app/context/feedback.context';
import '../app/ui/components/modules/wyswyg-editor/wysiwyg-editor.css'
import '../app/ui/styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  const title = pageProps.og?.title || 'DonorHub';
  const description = pageProps.og?.description || 'Outreach DonorHub: Accountable Zero Cost Donation Management.';
  const image = pageProps.og?.image?.path || getConfig().appUrl + '/assets/images/cause/cause-default-image.jpg'
  return (
    <>
     <NextSeo
      title={title}
      description={description}
      openGraph={{
        title,
        description,
        images: [{
          // FIXME: add dimensions
          url:image
        }]
      }}
      twitter={{
        cardType:"summary_large_image",
        site: "outreachlka",
        handle:"outreachlka"
      }}
      />
    <ChakraProvider>
        <FeedbackProvider>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </FeedbackProvider>
    </ChakraProvider>
    </>
  )
}

export default MyApp