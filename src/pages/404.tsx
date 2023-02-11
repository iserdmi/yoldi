import { ErrorPageComponent } from '@/components/ErrorPageComponent'
import { getDefaultServerSideProps } from '@/utils/defaultServerSideProps'
import { withAllWrappers } from '@/utils/withAllWrappers'
import { withClientOnly } from '@/utils/withClientOnly'

const NotFoundPage = () => {
  return <ErrorPageComponent title="Страница не найдена" />
}

export default withClientOnly(withAllWrappers(NotFoundPage))
