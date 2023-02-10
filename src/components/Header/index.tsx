import Link from 'next/link'
import { LinkButton } from '../Button'
import css from './index.module.scss'
import Logo from '@/assets/logo.svg'
import { Avatar } from '../Avatar'
import { getSignInRoute, getUserRoute, getUsersRoute } from '@/utils/routes'
import { user } from '@/utils/data'

export const Header = () => {
  // const me = null
  const me = user
  return (
    <div className={css.header}>
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
          <Link className={css.account} href={getUserRoute(me.slug)}>
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
