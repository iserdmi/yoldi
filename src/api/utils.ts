import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { PublicConfiguration, SWRResponse } from 'swr/_internal'
import { env } from '@/utils/env'
import { NotFoundError } from '@/utils/errors'
import { GetServerSidePropsContext } from 'next'

export type ServerCtxOrGetToken = GetServerSidePropsContext | (() => string | undefined)
const getToken = (serverCtxOrGetToken: ServerCtxOrGetToken) => {
  return typeof serverCtxOrGetToken === 'function' ? serverCtxOrGetToken() : serverCtxOrGetToken.req.cookies.token
}

type SwrOptions = Partial<PublicConfiguration<any, any, any>> & { skip?: boolean }

type QueryWithoutParams<TOutput> = {
  getPath: () => string
  fetcher: () => Promise<TOutput>
  useQuery: (options?: SwrOptions) => SWRResponse<TOutput>
  getFallback: () => Promise<{ [key: string]: TOutput }>
}

type QueryWithParams<TOutput, TGetPathParams> = {
  getPath: (params: TGetPathParams) => string
  fetcher: (params: TGetPathParams) => Promise<TOutput>
  useQuery: (params: TGetPathParams, options?: SwrOptions) => SWRResponse<TOutput>
  getFallback: (params: TGetPathParams) => Promise<{ [key: string]: TOutput }>
}

export const getApiHelpers = (serverCtxOrGetToken: ServerCtxOrGetToken) => {
  const appFetch = async <T>(url: string, options?: RequestInit): Promise<T> => {
    const token = getToken(serverCtxOrGetToken)
    return fetch(`${env.NEXT_PUBLIC_BACKEND_API_URL}${url}`, {
      ...options,
      headers: { ...options?.headers, ...(token ? { 'X-API-KEY': token } : {}) },
    }).then(async (res) => {
      const json = await (async () => {
        try {
          return await res.json()
        } catch (e) {
          return {}
        }
      })()
      if (!res.ok) {
        const errorMessage = json.message || res.statusText
        if (res.status === 404) {
          throw new NotFoundError(errorMessage)
        } else {
          throw new Error(errorMessage)
        }
      }
      return json
    })
  }

  const useAppSwr = (url: string, options?: SwrOptions) => {
    return useSWR(url, appFetch, {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      ...options,
    })
  }

  function createQuery<TOutput>(path: string): QueryWithoutParams<TOutput>
  function createQuery<TOutput, TGetPathParams>(
    getPath: (params: TGetPathParams) => string
  ): QueryWithParams<TOutput, TGetPathParams>
  function createQuery(getPathOrPath: string | Function): any {
    const paramsExists = typeof getPathOrPath === 'function'
    const getPath = typeof getPathOrPath === 'string' ? () => getPathOrPath : getPathOrPath
    const fetcherWithParams = (params: any) => appFetch(getPath(params))
    const fetcherWithoutParams = () => appFetch(getPath())
    const useQueryWithParams = (params: any, options?: SwrOptions) =>
      useAppSwr(options?.skip ? null : getPath(params), options)
    const useQueryWithoutParams = (options?: SwrOptions) => useAppSwr(options?.skip ? null : getPath(), options)
    const getFallbackWithParams = async (params: any) => {
      return {
        [getPath(params)]: await fetcherWithParams(params),
      }
    }
    const getFallbackWithoutParams = async () => {
      return {
        [getPath()]: await fetcherWithoutParams(),
      }
    }
    return {
      getPath,
      fetcher: paramsExists ? fetcherWithParams : fetcherWithoutParams,
      useQuery: paramsExists ? useQueryWithParams : useQueryWithoutParams,
      getFallback: paramsExists ? getFallbackWithParams : getFallbackWithoutParams,
    }
  }

  const createMutation = <TInput, TOutput>(method: 'POST' | 'PUT' | 'DELETE', path: string) => {
    const fetcher = (input: TInput) => {
      return appFetch<TOutput>(path, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      })
    }
    const swrFeatcher = (url: string, { arg }: { arg: TInput }) => {
      return fetcher(arg)
    }
    const useMutation = () => {
      return useSWRMutation<TOutput>(path, swrFeatcher)
    }
    return {
      getPath: () => path,
      fetcher,
      useMutation,
    }
  }

  return {
    appFetch,
    useAppSwr,
    createQuery,
    createMutation,
  }
}
