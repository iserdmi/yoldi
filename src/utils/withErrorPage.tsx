import { NextPageWithLayout, inter } from '@/pages/_app'
import { getDisplayName } from './getDisplayName'
import { SWRConfig } from 'swr'
import { AppContextProvider } from './ctx'
import { Layout } from '@/components/Layout'
import classNames from 'classnames'
import { ErrorPageComponent, ErrorPageProps } from '@/components/ErrorPageComponent'

export const withErrorPage = <T extends Object>(Page: NextPageWithLayout<T>) => {
  const WrappedPage = (props: T & { error?: ErrorPageProps }) => {
    if (props.error) {
      return <ErrorPageComponent {...props.error} />
    }
    return <Page {...props} />
  }
  WrappedPage.displayName = `withErrorPage(${getDisplayName(Page)})`
  WrappedPage.getLayout = Page.getLayout
  return WrappedPage
}
