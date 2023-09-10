
import '@/styles/AccordionTransition.scss'
import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import store from '@/store/store'
import { StrictMode } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StrictMode>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </StrictMode>
  )
}
