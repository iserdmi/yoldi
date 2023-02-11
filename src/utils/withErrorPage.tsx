import { ErrorPageComponent, ErrorPageProps } from '@/components/ErrorPageComponent'
import { getDisplayName } from './getDisplayName'
import { NextPageWithLayout } from './withLayouts'

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
