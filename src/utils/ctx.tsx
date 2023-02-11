import { User, clientApi } from '@/api'
import { ErrorPageComponent } from '@/components/ErrorPageComponent'
import Cookies from 'js-cookie'
import { createContext, useContext } from 'react'
import { useSWRConfig } from 'swr'
import { Loader } from '../components/Loader'
import { NextPageWithLayout } from '@/pages/_app'
import { getDisplayName } from './getDisplayName'

export type AppContext = {
  me: User | undefined
}

const AppReactContext = createContext<AppContext>({
  me: undefined,
})

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const swrConfig = useSWRConfig()
  const {
    data: me,
    error,
    isLoading,
  } = clientApi.getProfile.useQuery({
    skip: !Cookies.get('token') && !swrConfig.fallback[clientApi.getProfile.getKey()],
  })

  return (
    <AppReactContext.Provider
      value={{
        me,
      }}
    >
      {isLoading && !me ? <Loader type="page" /> : !!error ? <ErrorPageComponent message={error.message} /> : children}
    </AppReactContext.Provider>
  )
}

export const withAppContextProvider = <T,>(Page: NextPageWithLayout<T>) => {
  const WrappedPage = (props: T & { fallback: any }) => {
    return (
      <AppContextProvider>
        <Page {...props} />
      </AppContextProvider>
    )
  }
  WrappedPage.displayName = `withAppContextProvider(${getDisplayName(Page)})`
  return WrappedPage
}

export const useAppContext = () => {
  return useContext(AppReactContext)
}

export const useMe = () => {
  const { me } = useAppContext()
  return me
}
