import { createContext, useContext, useEffect } from 'react'
import { useSWRConfig } from 'swr'
import { Loader } from '../components/Loader'
import { getDisplayName } from './getDisplayName'
import { useToken } from './token'
import { type NextPageWithLayout } from './withLayouts'
import { type User, clientApi } from '@/api'

export type AppContext = {
  me: User | undefined
}

const AppReactContext = createContext<AppContext>({
  me: undefined,
})

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token, removeToken } = useToken()
  const swrConfig = useSWRConfig()
  const {
    data: me,
    error,
    isLoading,
  } = clientApi.getProfile.useQuery({
    skip: typeof window === 'undefined' ? !swrConfig.fallback[clientApi.getProfile.getKey()] : !token,
  })
  useEffect(() => {
    if (error != null) {
      removeToken()
    }
  }, [error, removeToken])

  return (
    <AppReactContext.Provider
      value={{
        me,
      }}
    >
      {isLoading && (me == null) ? <Loader type="page" /> : children}
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
