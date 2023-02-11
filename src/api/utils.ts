import { type GetServerSidePropsContext } from 'next'
import useSWR, { mutate } from 'swr'
import { type PublicConfiguration, type SWRResponse } from 'swr/_internal'
import { type SWRMutationConfiguration } from 'swr/mutation'
import { env } from '@/utils/env'
import { NotFoundError } from '@/utils/errors'

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
  getFallback: () => Promise<Record<string, TOutput>>
}

type QueryWithParams<TOutput, TGetKeyParams> = {
  getKey: (params: TGetKeyParams) => string
  fetcher: (params: TGetKeyParams) => Promise<TOutput>
  useQuery: (params: TGetKeyParams, options?: SwrOptions) => SWRResponse<TOutput, Error>
  mutate: (params: TGetKeyParams, data?: TOutput, options?: SWRMutationConfiguration<TOutput, Error>) => TOutput
  getFallback: (params: TGetKeyParams) => Promise<Record<string, TOutput>>
}

export const getApiHelpers = (serverCtxOrGetToken: ServerCtxOrGetToken) => {
  const appFetch = async <T>(url: string, options?: RequestInit): Promise<T> => {
    const token = getToken(serverCtxOrGetToken)
    return await fetch(`${env.NEXT_PUBLIC_BACKEND_API_URL}${url}`, {
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

  const useAppSwr = (key: string | null, options?: SwrOptions) => {
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
  function createQuery(keyOrGetKey: string | ((params?: any) => string)): any {
    const paramsExists = typeof keyOrGetKey === 'function'
    const getKey = typeof keyOrGetKey === 'string' ? () => keyOrGetKey : keyOrGetKey
    const fetcherWithParams = async (params: any) => await appFetch(getKey(params))
    const fetcherWithoutParams = async () => await appFetch(getKey())
    const useQueryWithParams = (params: any, options?: SwrOptions) =>
      useAppSwr(options?.skip ? null : getKey(params), options)
    const useQueryWithoutParams = (options?: SwrOptions) => useAppSwr(options?.skip ? null : getKey(), options)
    const mutateWithParams = async (params: any, data?: any, options?: SWRMutationConfiguration<any, any>) =>
      await mutate(getKey(params), data, options)
    const mutateWithoutParams = async (data?: any, options?: SWRMutationConfiguration<any, any>) =>
      await mutate(getKey(), data, options)
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

  const createMutation = <TInput, TOutput>(
    method: 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    key: string,
    options?: { type?: 'form-data' | 'json' }
  ) => {
    const { type = 'json' } = options || {}
    const fetcher = async (input: TInput) => {
      if (type === 'json') {
        return await appFetch<TOutput>(key, {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(input),
        })
      } else {
        const formData = new FormData()
        for (const [key, value] of Object.entries(input as Record<string, any>)) {
          formData.append(key, value)
        }
        return await appFetch<TOutput>(key, {
          method,
          body: formData,
        })
      }
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
