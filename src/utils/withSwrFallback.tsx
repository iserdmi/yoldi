import { NextPageWithLayout } from '@/pages/_app'
import { SWRConfig } from 'swr'
import { getDisplayName } from './getDisplayName'

export const withSwrFallback = <T extends Object>(Page: NextPageWithLayout<T>) => {
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
