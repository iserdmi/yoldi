import { clientApi, getApi } from '@/api'
import { ErrorPageComponent } from '@/components/ErrorPageComponent'
import { Loader } from '@/components/Loader'
import { UserPageComponent } from '@/components/UserPageComponent'
import { withDefaultServerSideProps } from '@/utils/defaultServerSideProps'
import { NotFoundError } from '@/utils/errors'
import { withAllWrappers } from '@/utils/withAllWrappers'

export const getServerSideProps = withDefaultServerSideProps(async (ctx) => {
  try {
    const serverApi = getApi(ctx)
    return {
      props: {
        fallback: {
          ...(await serverApi.getProfile.getFallback()),
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

export const MyProfilePage = () => {
  const { data: user, isLoading, error } = clientApi.getProfile.useQuery()
  if (error) return <ErrorPageComponent message={error.message} />
  if ((isLoading && !user) || !user) return <Loader type="page" />
  return <UserPageComponent user={user} />
}

export default withAllWrappers(MyProfilePage)
