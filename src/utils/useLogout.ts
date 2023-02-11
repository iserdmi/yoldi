import { clientApi } from '@/api'
import { useState } from 'react'
import { mutate } from 'swr'
import { useToken } from './token'

export const useLogout = () => {
  const { removeToken } = useToken()
  const [logouting, setLogouting] = useState(false)
  const logout = async () => {
    setLogouting(true)
    removeToken()
    await mutate(() => !clientApi.getProfile.getKey())
    setLogouting(false)
  }
  return { logout, logouting }
}
