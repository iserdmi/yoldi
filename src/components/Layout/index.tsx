import css from './index.module.scss'
import { Header } from '../Header'
import cn from 'classnames'

export const Layout = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={cn(css.layout, className)}>
      <div className={css.header}>
        <div className={css.floating}>
          <Header />
        </div>
      </div>
      <div className={css.content}>{children}</div>
    </div>
  )
}
