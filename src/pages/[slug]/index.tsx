import { useRouter } from 'next/router'
import { clientApi, getApi } from '@/api'
import { ErrorPageComponent } from '@/components/ErrorPageComponent'
import { Loader } from '@/components/Loader'
import { UserPageComponent } from '@/components/UserPageComponent'
import { withDefaultServerSideProps } from '@/utils/defaultServerSideProps'
import { NotFoundError } from '@/utils/errors'
import { withAllWrappers } from '@/utils/withAllWrappers'

type PageParams = { slug: string }

export const getServerSideProps = withDefaultServerSideProps(async (ctx) => {
  try {
    const serverApi = getApi(ctx)
    const { slug } = ctx.params as PageParams
    return {
      props: {
        fallback: {
          ...(await serverApi.getUser.getFallback({ slug })),
        },
      },
    }
  } catch (error: any) {
    if (error instanceof NotFoundError) {
      return {
        notFound: true,
      }
    }
    throw error
  }
})

const UserPage = () => {
  const router = useRouter()
  const { slug } = router.query as PageParams

  const { data: user, isLoading, error } = clientApi.getUser.useQuery({ slug })

  if (error != null) return <ErrorPageComponent message={error.message} />
  if ((isLoading && (user == null)) || (user == null)) return <Loader type="page" />
  return <UserPageComponent user={user} />
}

export default withAllWrappers(UserPage)
