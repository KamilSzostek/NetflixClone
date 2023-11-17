import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import store from '@/store/store'
import { SessionProvider } from "next-auth/react"
import '@/styles/globals.scss'
import '@/styles/AccordionTransition.scss'


export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  )
}
