import { SWRConfig } from 'swr'
import { getDisplayName } from './getDisplayName'
import { type NextPageWithLayout } from './withLayouts'

export const withSwrFallback = <T,>(Page: NextPageWithLayout<T>) => {
  const WrappedPage = (props: T & { fallback: any }) => {
    return (
      <SWRConfig value={props.fallback ? { fallback: props.fallback } : {}}>
        <Page {...props} />
      </SWRConfig>
    )
  }
  WrappedPage.displayName = `withSwrFallback(${getDisplayName(Page)})`
  return WrappedPage
}
