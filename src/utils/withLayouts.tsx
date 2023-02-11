import { ErrorPageProps } from '@/components/ErrorPageComponent'
import { Layout } from '@/components/Layout'
import { NextPage } from 'next'
import { fontsClassNames } from './fonts'
import { getDisplayName } from './getDisplayName'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode
}

export const withLayouts = <T extends Object>(Page: NextPageWithLayout<T>) => {
  // const getLayout = Page.getLayout ?? ((page) => page)
  const WrappedPage = (props: T & { error?: ErrorPageProps }) => {
    const getLayout: NonNullable<NextPageWithLayout<T>['getLayout']> =
      !props.error && !!Page.getLayout ? Page.getLayout : (page) => page
    return <Layout className={fontsClassNames}>{getLayout(<Page {...props} />)}</Layout>
  }
  WrappedPage.displayName = `withLayouts(${getDisplayName(Page)})`
  return WrappedPage
}
