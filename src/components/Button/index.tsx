import Link from 'next/link'
import css from './index.module.scss'
import cn from 'classnames'
import { Icon, IconName } from '../Icon'

export const LinkButton = ({
  children,
  href,
  size,
  style,
  className,
  leftIconName,
}: {
  children: string
  href: string
  size: 's' | 'm'
  style: 'black' | 'outline'
  className?: string
  leftIconName?: IconName
}) => {
  return (
    <Link
      href={href}
      className={cn({
        [css.button]: true,
        [css[`size-${size}`]]: true,
        [css[`style-${style}`]]: true,
        [className || '']: !!className,
      })}
    >
      {!!leftIconName && <Icon name={leftIconName} className={css.leftIcon} />}
      <span className={css.text}>{children}</span>
    </Link>
  )
}

export type ButtonProps = {
  children: string
  size: 's' | 'm'
  style: 'black' | 'outline'
  className?: string
  type: 'button' | 'submit'
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
  leftIconName?: IconName
}
export const Button = ({
  children,
  size,
  style,
  className,
  type,
  onClick,
  disabled,
  loading,
  fullWidth,
  leftIconName,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled || loading}
      className={cn({
        [css.button]: true,
        [css.fullWidth]: fullWidth,
        [css[`size-${size}`]]: true,
        [css[`style-${style}`]]: true,
        [css.disabled]: disabled || loading,
        [css.loading]: loading,
        [className || '']: !!className,
      })}
    >
      {!!leftIconName && <Icon name={leftIconName} className={css.leftIcon} />}
      <span className={css.text}>{children}</span>
    </button>
  )
}
