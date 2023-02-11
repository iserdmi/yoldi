import { Loader } from '@/components/Loader'
import { Meta } from '@/components/Meta'
import '@/styles/globals.scss'
import { useFonts } from '@/utils/fonts'
import { useRouterLoading } from '@/utils/useRouterLoading'
import type { AppProps } from 'next/app'

export default function MyApp({ Component, pageProps }: AppProps) {
  const routerLoading = useRouterLoading()
  useFonts()

  return (
    <>
      <Meta />
      <Loader hidden={!routerLoading} type="overlay" />
      <Component {...pageProps} />
    </>
  )
}
