import { ReactElement, ReactNode, useEffect } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { Layout } from '@/components/Layout'
import { Inter } from '@next/font/google'
import '@/styles/globals.scss'
import cn from 'classnames'
import Head from 'next/head'
import { Meta } from '@/components/Meta'

const inter = Inter({ subsets: ['latin', 'cyrillic'], weight: ['400', '500'], variable: '--inter' })

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  useEffect(() => {
    document.querySelector('body')?.classList.add(inter.variable, 'font-sans', inter.className)
  }, [])

  return (
    <Layout className={cn(inter.variable, 'font-sans', inter.className)}>
      <Meta />
      {getLayout(<Component {...pageProps} />)}
    </Layout>
  )
}
