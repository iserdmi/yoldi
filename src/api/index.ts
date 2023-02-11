import useSWRMutation from 'swr/mutation'
import { getApiHelpers, ServerCtxOrGetToken } from './utils'
import Cookies from 'js-cookie'

export type User = {
  name: string
  email: string
  slug: string
  description: string | undefined
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
export type GetUsersOutput = Array<User>
export type GetUserOutput = User
export type GetProfileOutput = User
export type LoginInput = {
  email: string
  password: string
}
export type LoginOutput = {
  value: string
}

export const getApi = (serverCtxOrGetToken: ServerCtxOrGetToken) => {
  const helpers = getApiHelpers(serverCtxOrGetToken)
  const { createQuery, createMutation } = helpers

  return {
    helpers,
    getUsers: createQuery<GetUsersOutput>('/user'),
    getUser: createQuery<GetUserOutput, { slug: string }>(({ slug }) => `/user/${slug}`),
    getProfile: createQuery<GetProfileOutput>('/profile'),
    login: createMutation<LoginInput, LoginOutput>('POST', '/auth/login'),
  }
}

export const clientApi = getApi(() => Cookies.get('token'))
