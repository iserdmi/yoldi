import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Loader } from '@/components/Loader'
import { getSignInRoute } from '@/utils/routes'
import { useToken } from '@/utils/token'
import { withClientOnly } from '@/utils/withClientOnly'

const SignOutPage = () => {
  const router = useRouter()
  const { removeToken } = useToken()
  useEffect(() => {
    removeToken()
    void router.push(getSignInRoute())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <Loader type="page" />
}

export default withClientOnly(SignOutPage)
