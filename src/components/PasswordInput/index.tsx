import css from './index.module.scss'
import { Input, InputProps } from '../Input'
import { Icon } from '../Icon'
import { useState } from 'react'
import cn from 'classnames'

export const PasswordInput = (props: Omit<InputProps, 'type'>) => {
  const [visible, setVisible] = useState(false)
  return (
    <Input
      {...props}
      type={visible ? 'text' : 'password'}
      rightIconElement={
        <button
          type="button"
          className={cn({ [css.visbility]: true, [css.visible]: visible })}
          onClick={() => setVisible(!visible)}
        >
          <Icon className={css.icon} name="eye" />
        </button>
      }
    />
  )
}
