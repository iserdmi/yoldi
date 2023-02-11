import { Title } from '@/components/Title'
import css from './index.module.scss'
import { Alert } from '../Alert'

export const ErrorPageComponent = ({ title = 'Ой, ошибка', message }: { title?: string; message?: string }) => {
  return (
    <div className={css.errorPage}>
      <div className={css.panel}>
        <Title as="h1">{title}</Title>
        {!!message && <Alert color="red">{message}</Alert>}
      </div>
    </div>
  )
}
