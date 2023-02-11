import cn from 'classnames'
import React from 'react'
import css from './index.module.scss'

export const Loader: React.FC<{ type: 'page' | 'section' | 'overlay'; hidden?: boolean }> = ({ type, hidden }) => (
  <span
    className={cn({
      [css.loader]: true,
      [css.hidden]: !!hidden,
      [css[`type-${type}`]]: true,
    })}
  />
)
