import { Avatar } from '@/components/Avatar'
import css from './[slug].module.scss'
import { Button } from '@/components/Button'
import { useState } from 'react'
import { Modal } from '@/components/Modal'
import { ProfileEditor } from '@/components/ProfileEditor'
import { Meta } from '@/components/Meta'
import { NotFoundError, getUserApi } from '@/utils/api'
import { Loader } from '@/components/Loader'
import { ErrorPage } from '@/components/ErrorPage'

export async function getServerSideProps(props: { params: { slug: string } }) {
  try {
    return {
      props: {
        params: props.params,
        fallback: {
          ...(await getUserApi.getFallback({ slug: props.params.slug })),
        },
      },
    }
  } catch (error: any) {
    if (error instanceof NotFoundError) {
      return {
        notFound: true,
      }
    }
    throw error
  }
}

export default function UserPage(props: { params: { slug: string } }) {
  const { data: user, isLoading, error } = getUserApi.useSwr({ slug: props.params.slug })
  const isMe = true
  const [editorOpen, setEditorOpen] = useState(false)
  if (isLoading || !user) return <Loader type="page" />
  if (error) return <ErrorPage message={error.message} />
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
            <Button className={css.logoutButton} type="button" style="outline" size="s" leftIconName="sign-out">
              Выйти
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
