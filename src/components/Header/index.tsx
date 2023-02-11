import Logo from '@/assets/logo.svg'
import { useMe } from '@/utils/ctx'
import { getSignInRoute, getUserRoute, getUsersRoute } from '@/utils/routes'
import { ActiveLink } from '../ActiveLink'
import { Avatar } from '../Avatar'
import { LinkButton } from '../Button'
import css from './index.module.scss'

export const Header = () => {
  const me = useMe()
  return (
    <div className={css.header} suppressHydrationWarning={true}>
      <div className={css.left}>
        <ActiveLink className={css.logoLink} href={getUsersRoute()}>
          <Logo className={css.logo} />
        </ActiveLink>
        <p className={css.desc}>
          Разрабатываем и запускаем
          <br />
          сложные веб проекты
        </p>
      </div>
      <div className={css.right}>
        {me ? (
          <ActiveLink className={css.account} href={getUserRoute(me.slug)}>
            <div className={css.name}>{me.name}</div>
            <div className={css.avatar}>
              <Avatar user={me} size="s" />
            </div>
          </ActiveLink>
        ) : (
          <LinkButton href={getSignInRoute()} size="s" style="outline">
            Войти
          </LinkButton>
        )}
      </div>
    </div>
  )
}
