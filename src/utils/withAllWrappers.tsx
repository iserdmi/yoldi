import flowRight from 'lodash/flowRight'
import { withAppContextProvider } from './ctx'
import { withErrorPage } from './withErrorPage'
import { type NextPageWithLayout, withLayouts } from './withLayouts'
import { withSwrFallback } from './withSwrFallback'

export const withAllWrappers = <T extends NextPageWithLayout>(Page: T): T => {
  return flowRight(withSwrFallback, withAppContextProvider, withLayouts, withErrorPage)(Page)
}
