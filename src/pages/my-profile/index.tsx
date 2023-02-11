// Deprecated: use /[slug] instead

import { ErrorPageComponent } from '@/components/ErrorPageComponent'
import { UserPageComponent } from '@/components/UserPageComponent'
import { useMe } from '@/utils/ctx'
import { withDefaultServerSideProps } from '@/utils/defaultServerSideProps'
import { NotFoundError } from '@/utils/errors'
import { getUserRoute } from '@/utils/routes'
import { withAllWrappers } from '@/utils/withAllWrappers'

export const getServerSideProps = withDefaultServerSideProps(async (ctx, defaultServerSideProps) => {
  try {
    if (defaultServerSideProps.props.me == null) {
      return {
        props: {
          error: {
            title: 'Только для авторизованных',
            message: 'Чтобы увидеть эту страницу войдите в личный кабинет',
          },
        },
      }
    }
    return {
      redirect: {
        permanent: false,
        destination: getUserRoute(defaultServerSideProps.props.me.slug),
      },
    }
    // Uncomment, if we decide to use /my-profile instead of /[slug]
    // const serverApi = getApi(ctx)
    // return {
    //   props: {
    //     fallback: {
    //       ...(await serverApi.getProfile.getFallback()),
    //     },
    //   },
    // }
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
  const me = useMe()
  if (me == null)
    return (
      <ErrorPageComponent
        {...{
          title: 'Только для авторизованных',
          message: 'Чтобы увидеть эту страницу войдите в личный кабинет',
        }}
      />
    )
  return <UserPageComponent user={me} />
}

export default withAllWrappers(MyProfilePage)
