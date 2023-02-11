import { type NextPage } from 'next'
import { fontsClassNames } from './fonts'
import { getDisplayName } from './getDisplayName'
import { type ErrorPageProps } from '@/components/ErrorPageComponent'
import { Layout } from '@/components/Layout'

export type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode
}

export const withLayouts = <T,>(Page: NextPageWithLayout<T>) => {
  // const getLayout = Page.getLayout ?? ((page) => page)
  const WrappedPage = (props: T & { error?: ErrorPageProps }) => {
    const getLayout: NonNullable<NextPageWithLayout<T>['getLayout']> =
      props.error == null && !(Page.getLayout == null) ? Page.getLayout : (page) => page
    return <Layout className={fontsClassNames}>{getLayout(<Page {...props} />)}</Layout>
  }
  WrappedPage.displayName = `withLayouts(${getDisplayName(Page)})`
  return WrappedPage
}
