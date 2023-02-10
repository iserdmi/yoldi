import { Form, FormButtonsAndAlert, FormInputs, FormSegments, useForm } from '@/components/Form'
import { Input } from '@/components/Input'
import { Title } from '@/components/Title'
import { zEmailRequired, zStringRequired } from '@/utils/zod'
import { z } from 'zod'
import css from './index.module.scss'
import { Button } from '@/components/Button'
import { Alert } from '@/components/Alert'
import { PasswordInput } from '@/components/PasswordInput'
import { NextPageWithLayout } from '@/pages/_app'
import { AuthLayout } from '@/components/AuthLayout'

const zSignInInput = z.object({
  email: zEmailRequired,
  password: zStringRequired,
})

const SignInPage: NextPageWithLayout = () => {
  const { formik, alertProps, buttonProps } = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: zSignInInput,
    onSubmit: async (values) => {
      console.log('sending')

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // resolve(true)
          reject({ message: 'error' })
          console.log('sended')
        }, 2000)
      })
    },
    disableButtonUntilValid: true,
  })

  return (
    <div className={css.page}>
      <Title as="h1">Вход в Yoldi Agency</Title>
      <Form formik={formik}>
        <FormSegments>
          <FormInputs>
            <Input name="email" placeholder="E-mail" formik={formik} leftIconName="envelope" />
            <PasswordInput name="password" placeholder="Пароль" formik={formik} leftIconName="lock" />
          </FormInputs>
          <FormButtonsAndAlert>
            <Alert {...alertProps} />
            <Button type="submit" size="m" style="black" fullWidth {...buttonProps}>
              Войти
            </Button>
          </FormButtonsAndAlert>
        </FormSegments>
      </Form>
    </div>
  )
}

SignInPage.getLayout = function getLayout(page: React.ReactElement) {
  return <AuthLayout>{page}</AuthLayout>
}

export default SignInPage
