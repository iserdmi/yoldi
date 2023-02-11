import merge from 'lodash/merge'
import { type GetServerSideProps, type GetServerSidePropsContext, type GetServerSidePropsResult } from 'next'
import { getApi } from '@/api'

export const getDefaultServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const serverApi = getApi(ctx)
  if (ctx.req.cookies.token) {
    try {
      const me = await serverApi.getProfile.fetcher()
      return {
        props: {
          me,
          fallback: {
            [serverApi.getProfile.getKey()]: me,
          },
        },
      }
    } catch (error: any) {
      return {
        props: {},
      }
    }
  }
  return {
    props: {},
  }
}

export const withDefaultServerSideProps = (
  initialGetServerSideProps: (
    ctx: GetServerSidePropsContext,
    defaultServerSideProps: Awaited<ReturnType<typeof getDefaultServerSideProps>>
  ) => Promise<GetServerSidePropsResult<any>> | GetServerSidePropsResult<any>
) => {
  const wrappedGetServerSideProps: GetServerSideProps = async (ctx) => {
    const defaultServerSideProps = await getDefaultServerSideProps(ctx)
    const initialServerSideProps = (await initialGetServerSideProps(ctx, defaultServerSideProps)) as any
    if (initialServerSideProps.notFound || initialServerSideProps.redirect) {
      return initialServerSideProps
    }
    return merge({}, defaultServerSideProps, initialServerSideProps)
  }
  return wrappedGetServerSideProps
}
