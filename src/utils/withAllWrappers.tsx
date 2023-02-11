import flowRight from 'lodash/flowRight'
import { withAppContextProvider } from './ctx'
import { NextPageWithLayout, withLayouts } from './withLayouts'
import { withSwrFallback } from './withSwrFallback'
import { withErrorPage } from './withErrorPage'

export const withAllWrappers = <T extends NextPageWithLayout>(Page: T): T => {
  return flowRight(withSwrFallback, withAppContextProvider, withLayouts, withErrorPage)(Page)
}
