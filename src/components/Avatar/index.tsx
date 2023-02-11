import cn from 'classnames'
import Image from 'next/image'
import css from './index.module.scss'
import { type User } from '@/api'

export type AvatarProps = {
  size: 's' | 'm'
  user: User
  className?: string
  priority?: boolean
  children?: React.ReactNode
}
export const Avatar = ({ size, user, className, children, priority = false }: AvatarProps) => {
  const imageSizePx = size === 'm' ? 100 : 50
  return (
    <div className={cn({ [css.avatar]: true, [css[`size-${size}`]]: size, [className || '']: !!className })}>
      {!user.image && <div className={css.letter}>{user.name.charAt(0).toUpperCase()}</div>}
      {!!user.image && (
        <div className={css.imagePlace}>
          <Image
            className={css.image}
            src={user.image.url}
            priority={priority}
            width={imageSizePx}
            height={imageSizePx}
            alt=""
          />
        </div>
      )}
      {children}
    </div>
  )
}
