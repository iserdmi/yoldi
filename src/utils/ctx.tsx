import { createContext, useContext } from 'react'
import { Loader } from '../components/Loader'
import { User, clientApi } from '@/api'
import { useSWRConfig } from 'swr'
import Cookies from 'js-cookie'
import { ErrorPageComponent } from '@/components/ErrorPageComponent'

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
    skip: !Cookies.get('token') && !swrConfig.fallback[clientApi.getProfile.getPath()],
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

export const useAppContext = () => {
  return useContext(AppReactContext)
}

export const useMe = () => {
  const { me } = useAppContext()
  return me
}
