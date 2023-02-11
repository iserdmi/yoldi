import cn from 'classnames'
import { ActiveLink } from '../ActiveLink'
import { Icon, type IconName } from '../Icon'
import css from './index.module.scss'

export const LinkButton = ({
  children,
  href,
  size,
  style,
  className,
  leftIconName,
  activeClassName,
}: {
  children: string
  href: string
  size: 's' | 'm'
  style: 'black' | 'outline'
  className?: string
  leftIconName?: IconName
  activeClassName?: string
}) => {
  return (
    <ActiveLink
      href={href}
      className={cn({
        [css.button]: true,
        [css[`size-${size}`]]: true,
        [css[`style-${style}`]]: true,
        [className || '']: !!className,
      })}
      activeClassName={activeClassName}
    >
      {!!leftIconName && <Icon name={leftIconName} className={css.leftIcon} />}
      <span className={css.text}>{children}</span>
    </ActiveLink>
  )
}

export type ButtonProps = {
  children: string
  size: 's' | 'm'
  style: 'black' | 'outline'
  className?: string
  type: 'button' | 'submit'
  onClick?: () => any
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
  leftIconName?: IconName
  rightIconName?: IconName
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
  rightIconName,
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
      {!!rightIconName && <Icon name={rightIconName} className={css.rightIcon} />}
    </button>
  )
}
