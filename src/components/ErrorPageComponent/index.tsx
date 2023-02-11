import { Title } from '@/components/Title'
import css from './index.module.scss'
import { Alert } from '../Alert'

export type ErrorPageProps = { title?: string; message?: string }
export const ErrorPageComponent = ({ title = 'Ой, ошибка', message }: ErrorPageProps) => {
  return (
    <div className={css.errorPage}>
      <div className={css.panel}>
        <Title as="h1">{title}</Title>
        {!!message && <Alert color="red">{message}</Alert>}
      </div>
    </div>
  )
}
