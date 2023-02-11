import { getDisplayName } from './getDisplayName'
import { type NextPageWithLayout } from './withLayouts'
import { ErrorPageComponent, type ErrorPageProps } from '@/components/ErrorPageComponent'

export const withErrorPage = <T,>(Page: NextPageWithLayout<T>) => {
  const WrappedPage = (props: T & { error?: ErrorPageProps }) => {
    if (props.error != null) {
      return <ErrorPageComponent {...props.error} />
    }
    return <Page {...props} />
  }
  WrappedPage.displayName = `withErrorPage(${getDisplayName(Page)})`
  WrappedPage.getLayout = Page.getLayout
  return WrappedPage
}
