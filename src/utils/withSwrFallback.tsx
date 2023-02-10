import { SWRConfig } from 'swr'

export const withSwrFallback = <T,>(Component: React.ComponentType<T>) => {
  const WrappedComponent = (props: T & { fallback: any }) => {
    return (
      <SWRConfig value={props.fallback ? { fallback: props.fallback } : {}}>
        <Component {...props} />
      </SWRConfig>
    )
  }
  WrappedComponent.displayName = `withSwrConfig(${getDisplayName(Component)})`
  return WrappedComponent
}

function getDisplayName(Component: React.ComponentType<any>) {
  return Component.displayName || Component.name || 'Component'
}
