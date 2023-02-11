import { env } from '@/utils/env'
import { NotFoundError } from '@/utils/errors'
import { GetServerSidePropsContext } from 'next'
import useSWR, { mutate } from 'swr'
import { PublicConfiguration, SWRResponse } from 'swr/_internal'
import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation'

export type ServerCtxOrGetToken = GetServerSidePropsContext | (() => string | undefined)
const getToken = (serverCtxOrGetToken: ServerCtxOrGetToken) => {
  return typeof serverCtxOrGetToken === 'function' ? serverCtxOrGetToken() : serverCtxOrGetToken.req.cookies.token
}

type SwrOptions = Partial<PublicConfiguration<any, any, any>> & { skip?: boolean }

type QueryWithoutParams<TOutput> = {
  getKey: () => string
  fetcher: () => Promise<TOutput>
  useQuery: (options?: SwrOptions) => SWRResponse<TOutput, Error>
  mutate: (data?: TOutput, options?: SWRMutationConfiguration<TOutput, Error>) => TOutput
  getFallback: () => Promise<{ [key: string]: TOutput }>
}

type QueryWithParams<TOutput, TGetKeyParams> = {
  getKey: (params: TGetKeyParams) => string
  fetcher: (params: TGetKeyParams) => Promise<TOutput>
  useQuery: (params: TGetKeyParams, options?: SwrOptions) => SWRResponse<TOutput, Error>
  mutate: (params: TGetKeyParams, data?: TOutput, options?: SWRMutationConfiguration<TOutput, Error>) => TOutput
  getFallback: (params: TGetKeyParams) => Promise<{ [key: string]: TOutput }>
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

  const useAppSwr = (key: string, options?: SwrOptions) => {
    return useSWR(key, appFetch, {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      ...options,
    })
  }

  function createQuery<TOutput>(key: string): QueryWithoutParams<TOutput>
  function createQuery<TOutput, TGetKeyParams>(
    getKey: (params: TGetKeyParams) => string
  ): QueryWithParams<TOutput, TGetKeyParams>
  function createQuery(keyOrGetKey: string | Function): any {
    const paramsExists = typeof keyOrGetKey === 'function'
    const getKey = typeof keyOrGetKey === 'string' ? () => keyOrGetKey : keyOrGetKey
    const fetcherWithParams = (params: any) => appFetch(getKey(params))
    const fetcherWithoutParams = () => appFetch(getKey())
    const useQueryWithParams = (params: any, options?: SwrOptions) =>
      useAppSwr(options?.skip ? null : getKey(params), options)
    const useQueryWithoutParams = (options?: SwrOptions) => useAppSwr(options?.skip ? null : getKey(), options)
    const mutateWithParams = (params: any, data?: any, options?: SWRMutationConfiguration<any, any>) =>
      mutate(getKey(params), data, options)
    const mutateWithoutParams = (data?: any, options?: SWRMutationConfiguration<any, any>) =>
      mutate(getKey(), data, options)
    const getFallbackWithParams = async (params: any) => {
      return {
        [getKey(params)]: await fetcherWithParams(params),
      }
    }
    const getFallbackWithoutParams = async () => {
      return {
        [getKey()]: await fetcherWithoutParams(),
      }
    }
    return {
      getKey,
      fetcher: paramsExists ? fetcherWithParams : fetcherWithoutParams,
      useQuery: paramsExists ? useQueryWithParams : useQueryWithoutParams,
      getFallback: paramsExists ? getFallbackWithParams : getFallbackWithoutParams,
      mutate: paramsExists ? mutateWithParams : mutateWithoutParams,
    }
  }

  const createMutation = <TInput, TOutput>(method: 'POST' | 'PUT' | 'PATCH' | 'DELETE', key: string) => {
    const fetcher = (input: TInput) => {
      return appFetch<TOutput>(key, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      })
    }
    return {
      fetcher,
    }
  }

  return {
    appFetch,
    useAppSwr,
    createQuery,
    createMutation,
  }
}
