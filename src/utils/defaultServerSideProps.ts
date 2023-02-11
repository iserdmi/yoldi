import { getApi } from '@/api'
import merge from 'lodash/merge'
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'

export const getDefaultServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const serverApi = getApi(ctx)
    if (ctx.req.cookies.token) {
      try {
        const me = await serverApi.getProfile.fetcher()
        return {
          props: {
            me: me,
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
  } catch (error: any) {
    throw error
  }
}

export const withDefaultServerSideProps = (
  initialGetServerSideProps: (
    ctx: GetServerSidePropsContext,
    defaultServerSideProps: Awaited<ReturnType<typeof getDefaultServerSideProps>>
  ) => Promise<GetServerSidePropsResult<any>> | GetServerSidePropsResult<any>
) => {
  const wrappedGetServerSideProps: GetServerSideProps = async (ctx) => {
    try {
      const defaultServerSideProps = await getDefaultServerSideProps(ctx)
      const initialServerSideProps = (await initialGetServerSideProps(ctx, defaultServerSideProps)) as any
      if (initialServerSideProps.notFound || initialServerSideProps.redirect) {
        return initialServerSideProps
      }
      return merge(defaultServerSideProps, initialServerSideProps)
    } catch (error: any) {
      throw error
    }
  }
  return wrappedGetServerSideProps
}
