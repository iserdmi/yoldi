import { clientApi } from '@/api'
import { Alert } from '@/components/Alert'
import { AuthLayout } from '@/components/AuthLayout'
import { Button } from '@/components/Button'
import { Form, FormButtonsAndAlert, FormInputs, FormSegments, useForm } from '@/components/Form'
import { Input } from '@/components/Input'
import { PasswordInput } from '@/components/PasswordInput'
import { Title } from '@/components/Title'
import { NextPageWithLayout } from '@/pages/_app'
import { withDefaultServerSideProps } from '@/utils/defaultServerSideProps'
import { getMyProfileRoute } from '@/utils/routes'
import { withAllWrappers } from '@/utils/withAllWrappers'
import { zEmailRequired, zStringRequired } from '@/utils/zod'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { mutate } from 'swr'
import { z } from 'zod'
import css from './index.module.scss'

const zSignInInput = z.object({
  email: zEmailRequired,
  password: zStringRequired,
})

export const getServerSideProps = withDefaultServerSideProps((ctx, defaultServerSideProps) => {
  if (defaultServerSideProps.props.me) {
    return {
      redirect: {
        permanent: false,
        destination: getMyProfileRoute(),
      },
    }
  }
  return defaultServerSideProps
})

const SignInPage: NextPageWithLayout = () => {
  const router = useRouter()
  const { formik, alertProps, buttonProps } = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: zSignInInput,
    onSubmit: async (values) => {
      const result = await clientApi.login.fetcher(values)
      Cookies.set('token', result.value, { expires: 99999 })
      await router.push(getMyProfileRoute())
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

SignInPage.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>
}

export default withAllWrappers(SignInPage)
