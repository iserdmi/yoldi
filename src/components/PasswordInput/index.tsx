import cn from 'classnames'
import { useState } from 'react'
import { Icon } from '../Icon'
import { Input, type InputProps } from '../Input'
import css from './index.module.scss'

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
          onClick={() => { setVisible(!visible); }}
        >
          <Icon className={css.icon} name="eye" />
        </button>
      }
    />
  )
}
