import cn from 'classnames'
import css from './index.module.scss'

export const Avatar = ({
  size,
  user,
  className,
}: {
  size: 's' | 'm'
  user: { name: string; image: any }
  className?: string
}) => {
  return (
    <div className={cn({ [css.avatar]: true, [css[`size-${size}`]]: size, [className || '']: !!className })}>
      <div className={css.letter}>{user.name.charAt(0).toUpperCase()}</div>
    </div>
  )
}
