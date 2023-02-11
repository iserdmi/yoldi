export const getDisplayName = (Component: React.ComponentType<any>) => {
  return Component.displayName || Component.name || 'Component'
}
