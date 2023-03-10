import type { AppProps } from 'next/app'
import { CookiesProvider } from 'react-cookie'
import { Loader } from '@/components/Loader'
import { Meta } from '@/components/Meta'
import '@/styles/globals.scss'
import { useFonts } from '@/utils/fonts'
import { MyToaster } from '@/utils/notify'
import { useRouterLoading } from '@/utils/useRouterLoading'

export default function MyApp({ Component, pageProps }: AppProps) {
  const routerLoading = useRouterLoading()
  useFonts()

  return (
    <>
      <CookiesProvider>
        <Meta />
        <MyToaster />
        <Loader hidden={!routerLoading} type="overlay" />
        <Component {...pageProps} />
      </CookiesProvider>
    </>
  )
}
