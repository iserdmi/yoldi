import { Title } from '@/components/Title'
import css from './index.module.scss'
import { Alert } from '../Alert'

export const ErrorPage = ({ title = 'Ой, ошибка', message }: { title?: string; message?: string }) => {
  return (
    <div className={css.errorPage}>
      <Title as="h1">{title}</Title>
      {!!message && <Alert color="red">{message}</Alert>}
    </div>
  )
}
