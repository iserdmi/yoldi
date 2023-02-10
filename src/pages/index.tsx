import { Alert } from '@/components/Alert'
import { Avatar } from '@/components/Avatar'
import { Loader } from '@/components/Loader'
import { Meta } from '@/components/Meta'
import { Title } from '@/components/Title'
import { getUsersApi, getUsersFetch, getUsersUrl, useGetUsers } from '@/utils/api'
import { getUserRoute } from '@/utils/routes'
import { withSwrFallback } from '@/utils/withSwrFallback'
import Link from 'next/link'
import css from './index.module.scss'

export async function getServerSideProps() {
  return {
    props: {
      fallback: {
        ...(await getUsersApi.getFallback()),
      },
    },
  }
}

const UsersPage = () => {
  const { data: users, isLoading, error } = getUsersApi.useSwr()
  console.log(getUsersApi.getPath)

  return (
    <div className={css.page}>
      <Meta title="Список аккаунтов" />
      <Title as="h1" className={css.title}>
        Список аккаунтов
      </Title>
      {!!isLoading && !users && <Loader type="section" />}
      {!!error && <Alert color="red">{error.message}</Alert>}
      {!!users && (
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

export default withSwrFallback(UsersPage)
