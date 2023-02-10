import { Form, FormButtonsAndAlert, FormInputs, FormSegments, useForm } from '@/components/Form'
import { Input } from '@/components/Input'
import { Title } from '@/components/Title'
import { zEmailRequired, zStringRequired } from '@/utils/zod'
import { z } from 'zod'
import css from './index.module.scss'
import { Button } from '@/components/Button'
import { Alert } from '@/components/Alert'
import { PasswordInput } from '@/components/PasswordInput'
import { AuthLayout } from '@/components/AuthLayout'
import { NextPageWithLayout } from '@/pages/_app'
import { Meta } from '@/components/Meta'

const zSignUpInput = z.object({
  name: zStringRequired,
  email: zEmailRequired,
  password: zStringRequired,
})

const SignUpPage: NextPageWithLayout = () => {
  const { formik, alertProps, buttonProps } = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: zSignUpInput,
    onSubmit: async (values) => {
      console.log('sending')

      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(true)
          console.log('sended')
        }, 2000)
      })
    },
    disableButtonUntilValid: true,
  })

  return (
    <div className={css.page}>
      <Meta title="Регистрация" />
      <Title as="h1">
        Регистрация
        <br />
        в Yoldi Agency
      </Title>
      <Form formik={formik}>
        <FormSegments>
          <FormInputs>
            <Input name="name" placeholder="Имя" formik={formik} leftIconName="user" />
            <Input name="email" placeholder="E-mail" formik={formik} leftIconName="envelope" />
            <PasswordInput name="password" placeholder="Пароль" formik={formik} leftIconName="lock" />
          </FormInputs>
          <FormButtonsAndAlert>
            <Alert {...alertProps} />
            <Button type="submit" size="m" style="black" fullWidth {...buttonProps}>
              Создать аккаунт
            </Button>
          </FormButtonsAndAlert>
        </FormSegments>
      </Form>
    </div>
  )
}

SignUpPage.getLayout = function getLayout(page: React.ReactElement) {
  return <AuthLayout>{page}</AuthLayout>
}

export default SignUpPage
