import Logo from '@/assets/logo.svg'
import { useMe } from '@/utils/ctx'
import { getMyProfileRoute, getSignInRoute, getUserRoute, getUsersRoute } from '@/utils/routes'
import Link from 'next/link'
import { Avatar } from '../Avatar'
import { LinkButton } from '../Button'
import css from './index.module.scss'

export const Header = () => {
  const me = useMe()
  return (
    <div className={css.header} suppressHydrationWarning={true}>
      <div className={css.left}>
        <Link className={css.logoLink} href={getUsersRoute()}>
          <Logo className={css.logo} />
        </Link>
        <p className={css.desc}>
          Разрабатываем и запускаем
          <br />
          сложные веб проекты
        </p>
      </div>
      <div className={css.right}>
        {me ? (
          <Link className={css.account} href={getMyProfileRoute()}>
            <div className={css.name}>{me.name}</div>
            <div className={css.avatar}>
              <Avatar user={me} size="s" />
            </div>
          </Link>
        ) : (
          <LinkButton href={getSignInRoute()} size="s" style="outline">
            Войти
          </LinkButton>
        )}
      </div>
    </div>
  )
}
