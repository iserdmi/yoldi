import React, { useEffect, useState } from 'react'
import { getDisplayName } from './getDisplayName'

const ClientOnly = ({ children }: { children: React.ReactNode }) => {
  const [hasMounted, setHasMounted] = useState(false)
  useEffect(() => {
    setHasMounted(true)
  }, [])
  if (!hasMounted) {
    return null
  }
  return <>{children}</>
}

export const withClientOnly = <T extends Record<string, unknown>>(Component: React.ComponentType<T>) => {
  const WrappedComponent = (props: T) => (
    <ClientOnly>
      <Component {...props} />
    </ClientOnly>
  )
  WrappedComponent.displayName = `withClientOnly(${getDisplayName(Component)})`
  return WrappedComponent
}
