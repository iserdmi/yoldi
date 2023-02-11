import { Meta } from '@/components/Meta'
import '@/styles/globals.scss'
import { Inter } from '@next/font/google'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ReactElement, ReactNode, useEffect } from 'react'

export const inter = Inter({ subsets: ['latin', 'cyrillic'], weight: ['400', '500'], variable: '--inter' })

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    document.querySelector('body')?.classList.add(inter.variable, 'font-sans', inter.className)
  }, [])

  return (
    <>
      <Meta />
      <Component {...pageProps} />
    </>
  )
}
