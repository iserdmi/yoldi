import useSWR from 'swr'
import { PublicConfiguration, SWRResponse } from 'swr/_internal'
import { env } from './env'

export class NotFoundError extends Error {}

const fetchBackendApi = async <T>(url: string): Promise<T> => {
  return fetch(`${env.NEXT_PUBLIC_BACKEND_API_URL}${url}`, {}).then((res) => {
    if (!res.ok) {
      if (res.status === 404) {
        throw new NotFoundError(res.statusText)
      } else {
        throw new Error(res.statusText)
      }
    }
    return res.json()
  })
}

type SwrOptions = Partial<PublicConfiguration<any, any, any>>

const useBackendApiSwr = <T>(url: string, options?: SwrOptions) => {
  return useSWR(url, fetchBackendApi, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
    ...options,
  })
}

type CreateApiHelpersWithoutParams<TOutput> = {
  getPath: () => string
  fetcher: () => Promise<TOutput>
  useSwr: (options?: SwrOptions) => SWRResponse<TOutput>
  getFallback: () => Promise<{ [key: string]: TOutput }>
}
type CreateApiHelpersWithParams<TOutput, TGetPathParams> = {
  getPath: (params: TGetPathParams) => string
  fetcher: (params: TGetPathParams) => Promise<TOutput>
  useSwr: (params: TGetPathParams, options?: SwrOptions) => SWRResponse<TOutput>
  getFallback: (params: TGetPathParams) => Promise<{ [key: string]: TOutput }>
}

function createApiHelpers<TOutput>(path: string): CreateApiHelpersWithoutParams<TOutput>
function createApiHelpers<TOutput, TGetPathParams>(
  getPath: (params: TGetPathParams) => string
): CreateApiHelpersWithParams<TOutput, TGetPathParams>
function createApiHelpers(getPathOrPath: string | Function): any {
  const paramsExists = typeof getPathOrPath === 'function'
  const getPath = typeof getPathOrPath === 'string' ? () => getPathOrPath : getPathOrPath
  const fetcherWithParams = (params: any) => fetchBackendApi(getPath(params))
  const fetcherWithoutParams = () => fetchBackendApi(getPath())
  const useSwrWithParams = (params: any, options?: SwrOptions) => useBackendApiSwr(getPath(params), options)
  const useSwrWithoutParams = (options?: SwrOptions) => useBackendApiSwr(getPath(), options)
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
    useSwr: paramsExists ? useSwrWithParams : useSwrWithoutParams,
    getFallback: paramsExists ? getFallbackWithParams : getFallbackWithoutParams,
  }
}

export type GetUsersApiOutput = Array<{
  name: string
  email: string
  slug: string
  description: string
  image:
    | {
        id: string
        url: string
        width: string
        height: string
      }
    | undefined
  cover:
    | {
        id: string
        url: string
        width: string
        height: string
      }
    | undefined
}>
export const getUsersApi = createApiHelpers<GetUsersApiOutput>('/user')

export type GetUserApiOutput = {
  name: string
  email: string
  slug: string
  description: string
  image:
    | {
        id: string
        url: string
        width: string
        height: string
      }
    | undefined
  cover:
    | {
        id: string
        url: string
        width: string
        height: string
      }
    | undefined
}
export const getUserApi = createApiHelpers<GetUserApiOutput, { slug: string }>(({ slug }) => `/user/${slug}`)
