import { ErrorPageComponent } from '@/components/ErrorPageComponent'
import { withAllWrappers } from '@/utils/withAllWrappers'
import { withClientOnly } from '@/utils/withClientOnly'

const InternalServerErrorPage = () => {
  return <ErrorPageComponent title="Ошибка сервера" />
}

export default withClientOnly(withAllWrappers(InternalServerErrorPage))
