import { NextPageWithLayout, inter } from '@/pages/_app'
import { getDisplayName } from './getDisplayName'
import { SWRConfig } from 'swr'
import { AppContextProvider } from './ctx'
import { Layout } from '@/components/Layout'
import classNames from 'classnames'

export const withAllWrappers = <T,>(Page: NextPageWithLayout<T>) => {
  const getLayout = Page.getLayout ?? ((page) => page)
  const WrappedComponent = (props: T & { fallback: any }) => {
    return (
      <SWRConfig value={props.fallback ? { fallback: props.fallback } : {}}>
        <AppContextProvider>
          <Layout className={classNames(inter.variable, 'font-sans', inter.className)}>
            {getLayout(<Page {...props} />)}
          </Layout>
        </AppContextProvider>
      </SWRConfig>
    )
  }
  WrappedComponent.displayName = `withAllWrappers(${getDisplayName(Page)})`
  return WrappedComponent
}
