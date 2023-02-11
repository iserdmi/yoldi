import { useCookies, Cookies } from 'react-cookie'

export const getClientToken = () => {
  return new Cookies().get('token')
}

export const setTokenSilently = (token: string) => {
  return new Cookies().set('token', token, { path: '/', expires: new Date(2099, 11, 31, 23, 59, 59) })
}

export const useToken = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['token'])
  return {
    token: cookies.token,
    setToken: (token: string) => setCookie('token', token, { path: '/', expires: new Date(2099, 11, 31, 23, 59, 59) }),
    removeToken: () => removeCookie('token', { path: '/' }),
  }
}
