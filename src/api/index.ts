import { getApiHelpers, type ServerCtxOrGetToken } from './utils'
import { getClientToken } from '@/utils/token'

export type User = {
  name: string
  email: string
  slug: string
  description: string | null
  image: {
    id: string
    url: string
    width: string
    height: string
  } | null
  cover: {
    id: string
    url: string
    width: string
    height: string
  } | null
}
export type GetUsersOutput = User[]
export type GetUserOutput = User
export type GetProfileOutput = User
export type LoginInput = {
  email: string
  password: string
}
export type LoginOutput = {
  value: string
}
export type SignUpInput = {
  name: string
  email: string
  password: string
}
export type SignUpOutput = {
  value: string
}
export type PatchProfileInput = {
  name: string
  imageId?: string | null
  password?: string
  slug: string
  coverId?: string | null
  description?: string | null
}
export type PatchProfileOutput = User
export type UploadImageInput = {
  file: File
}
export type UploadImageOutput = {
  id: string
  url: string
  width: string
  height: string
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
    signUp: createMutation<SignUpInput, SignUpOutput>('POST', '/auth/sign-up'),
    patchProfile: createMutation<PatchProfileInput, PatchProfileOutput>('PATCH', '/profile'),
    uploadImage: createMutation<UploadImageInput, UploadImageOutput>('POST', '/image', { type: 'form-data' }),
  }
}

export const clientApi = getApi(getClientToken)
