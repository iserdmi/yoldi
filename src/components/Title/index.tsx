import css from './index.module.scss'
import cn from 'classnames'

export const Title = ({
  children,
  as,
  className,
}: {
  children: React.ReactNode
  as: 'h1' | 'h2' | 'h3'
  className?: string
}) => {
  const classNameHere = cn(css.title, className)
  return as === 'h1' ? (
    <h1 className={classNameHere}>{children}</h1>
  ) : as === 'h2' ? (
    <h2 className={classNameHere}>{children}</h2>
  ) : as === 'h3' ? (
    <h3 className={classNameHere}>{children}</h3>
  ) : null
}
