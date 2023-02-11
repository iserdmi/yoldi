import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { getSignInRoute } from './routes'

export const useLogout = () => {
  const router = useRouter()
  return () => {
    Cookies.remove('token')
    router.push(getSignInRoute())
  }
}
