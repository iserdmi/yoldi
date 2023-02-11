import { Layout } from '@/components/Layout'
import { NextPageWithLayout, inter } from '@/pages/_app'
import classNames from 'classnames'
import { getDisplayName } from './getDisplayName'
import { ErrorPageProps } from '@/components/ErrorPageComponent'

export const withLayouts = <T extends Object>(Page: NextPageWithLayout<T>) => {
  const getLayout = Page.getLayout ?? ((page) => page)
  const WrappedPage = (props: T & { error?: ErrorPageProps }) => {
    // const getLayout: NonNullable<NextPageWithLayout<T>['getLayout']> =
    //   !props.error && !!Page.getLayout ? Page.getLayout : (page) => page
    return (
      <Layout className={classNames(inter.variable, 'font-sans', inter.className)}>
        {getLayout(<Page {...props} />)}
      </Layout>
    )
  }
  WrappedPage.displayName = `withLayouts(${getDisplayName(Page)})`
  return WrappedPage
}
