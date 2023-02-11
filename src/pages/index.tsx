import Link from 'next/link'
import css from './index.module.scss'
import { clientApi, getApi } from '@/api'
import { Alert } from '@/components/Alert'
import { Avatar } from '@/components/Avatar'
import { Loader } from '@/components/Loader'
import { Meta } from '@/components/Meta'
import { Title } from '@/components/Title'
import { withDefaultServerSideProps } from '@/utils/defaultServerSideProps'
import { getUserRoute } from '@/utils/routes'
import { withAllWrappers } from '@/utils/withAllWrappers'

export const getServerSideProps = withDefaultServerSideProps(async (ctx) => {
  const serverApi = getApi(ctx)
  return {
    props: {
      fallback: {
        ...(await serverApi.getUsers.getFallback()),
      },
    },
  }
})

const UsersPage = () => {
  const { data: users, isLoading, error } = clientApi.getUsers.useQuery()

  return (
    <div className={css.page}>
      <Meta title="Список аккаунтов" />
      <Title as="h1" className={css.title}>
        Список аккаунтов
      </Title>
      {isLoading && (users == null) && <Loader type="section" />}
      {!(error == null) && <Alert color="red">{error.message}</Alert>}
      {!(users == null) && (
        <div className={css.users}>
          {users.map((user) => (
            <Link href={getUserRoute(user.slug)} key={user.email} className={css.user} prefetch={false}>
              <Avatar className={css.avatar} user={user} size="s" />
              <div className={css.nameAndEmail}>
                <div className={css.name}>{user.name}</div>
                <div className={css.email}>{user.email}</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default withAllWrappers(UsersPage)
