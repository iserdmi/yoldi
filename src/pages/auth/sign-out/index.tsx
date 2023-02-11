import { Loader } from '@/components/Loader'
import { getSignInRoute } from '@/utils/routes'
import { withClientOnly } from '@/utils/withClientOnly'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const SignOutPage = () => {
  const router = useRouter()
  Cookies.remove('token')
  useEffect(() => {
    router.push(getSignInRoute())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <Loader type="page" />
}

export default withClientOnly(SignOutPage)
