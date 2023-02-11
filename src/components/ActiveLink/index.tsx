import cn from 'classnames'
import Link, { type LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import { type PropsWithChildren, useEffect, useState } from 'react'
import css from './index.module.scss'

type ActiveLinkProps = LinkProps & {
  className?: string
  activeClassName?: string
}
export const ActiveLink = ({
  children,
  activeClassName = css.active,
  className,
  ...props
}: PropsWithChildren<ActiveLinkProps>) => {
  const { asPath, isReady } = useRouter()
  const [computedClassName, setComputedClassName] = useState(className)

  useEffect(() => {
    // Check if the router fields are updated client-side
    if (isReady) {
      // Dynamic route will be matched via props.as
      // Static route will be matched via props.href
      const linkPathname = new URL((props.as || props.href) as string, location.href).pathname

      // Using URL().pathname to get rid of query and hash
      const activePathname = new URL(asPath, location.href).pathname

      const newClassName = linkPathname === activePathname ? cn(className, activeClassName) : className

      if (newClassName !== computedClassName) {
        setComputedClassName(newClassName)
      }
    }
  }, [asPath, isReady, props.as, props.href, activeClassName, className, computedClassName])

  return (
    <Link className={computedClassName} {...props}>
      {children}
    </Link>
  )
}
