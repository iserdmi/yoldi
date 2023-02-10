import { getSignInRoute, getSignUpRoute } from '@/utils/routes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import css from './index.module.scss'

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  return (
    <div className={css.layout}>
      <div className={css.content}>
        <div className={css.panel}>{children}</div>
      </div>
      <div className={css.footer}>
        {pathname === getSignInRoute() ? (
          <>
            Еще нет аккаунта?{' '}
            <Link className={css.link} href={getSignUpRoute()}>
              Зарегистрироваться
            </Link>
          </>
        ) : pathname === getSignUpRoute() ? (
          <>
            Уже есть аккаунт?{' '}
            <Link className={css.link} href={getSignInRoute()}>
              Войти
            </Link>
          </>
        ) : null}
      </div>
    </div>
  )
}
