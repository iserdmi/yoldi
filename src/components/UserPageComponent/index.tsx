import { Avatar } from '@/components/Avatar'
import { Button, LinkButton } from '@/components/Button'
import { Meta } from '@/components/Meta'
import { Modal } from '@/components/Modal'
import { ProfileEditor } from '@/components/ProfileEditor'
import { useState } from 'react'
import css from './index.module.scss'
import { User } from '@/api'
import { useMe } from '@/utils/ctx'
import Cookies from 'js-cookie'
import { mutate } from 'swr'
import { useRouter } from 'next/router'
import { useLogout } from '@/utils/logout'
import { getSignOutRoute } from '@/utils/routes'

export const UserPageComponent = ({ user }: { user: User }) => {
  const me = useMe()
  const isMe = user.slug === me?.slug
  const [editorOpen, setEditorOpen] = useState(false)
  const logout = useLogout()
  return (
    <div className={css.page}>
      <Meta title={user.name} />
      <div className={css.banner}></div>
      <div className={css.content}>
        <div className={css.avatar}>
          <Avatar user={user} size="m" />
        </div>
        <div className={css.header}>
          <div className={css.left}>
            <div className={css.name}>{user.name}</div>
            <div className={css.email}>
              <a className={css.emailLink} href={`mailto:${user.email}`}>
                {user.email}
              </a>
            </div>
          </div>
          {isMe && (
            <div className={css.right}>
              <Button
                className={css.editButton}
                type="button"
                style="outline"
                size="s"
                leftIconName="pen"
                onClick={() => setEditorOpen(true)}
              >
                Редактировать
              </Button>
              <Modal isOpen={editorOpen} onRequestClose={() => setEditorOpen(false)}>
                <ProfileEditor user={user} setEditorOpen={setEditorOpen} />
              </Modal>
            </div>
          )}
        </div>
        <div className={css.description}>
          <p>{user.description}</p>
        </div>
        {isMe && (
          <div className={css.logoutButtonPlace}>
            {/* <LinkButton
              className={css.logoutButton}
              href={getSignOutRoute()}
              style="outline"
              size="s"
              leftIconName="sign-out"
            >
              Выйти
            </LinkButton> */}
            <Button
              type="button"
              className={css.logoutButton}
              onClick={logout}
              style="outline"
              size="s"
              leftIconName="sign-out"
            >
              Выйти
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}