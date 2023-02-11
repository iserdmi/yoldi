import Cookies from 'js-cookie'
import { useState } from 'react'
import { mutate } from 'swr'

export const useLogout = () => {
  const [logouting, setLogouting] = useState(false)
  const logout = async () => {
    setLogouting(true)
    Cookies.remove('token')
    await mutate(() => true)
    setLogouting(false)
  }
  return { logout, logouting }
}
