import { clientApi } from '@/api'
import { Alert } from '@/components/Alert'
import { AuthLayout } from '@/components/AuthLayout'
import { Button } from '@/components/Button'
import { Form, FormButtonsAndAlert, FormInputs, FormSegments, useForm } from '@/components/Form'
import { Input } from '@/components/Input'
import { Meta } from '@/components/Meta'
import { PasswordInput } from '@/components/PasswordInput'
import { Title } from '@/components/Title'
import { withDefaultServerSideProps } from '@/utils/defaultServerSideProps'
import { withAllWrappers } from '@/utils/withAllWrappers'
import { zEmailRequired, zStringRequired } from '@/utils/zod'
import { useRouter } from 'next/router'
import { z } from 'zod'
import css from './index.module.scss'
import { NextPageWithLayout } from '@/utils/withLayouts'
import { getUserRoute } from '@/utils/routes'
import { setTokenSilently, useToken } from '@/utils/token'

export const getServerSideProps = withDefaultServerSideProps((ctx, defaultServerSideProps) => {
  if (defaultServerSideProps.props.me) {
    return {
      redirect: {
        permanent: false,
        destination: getUserRoute(defaultServerSideProps.props.me.slug),
      },
    }
  }
  return defaultServerSideProps
})

const zSignUpInput = z.object({
  name: zStringRequired,
  email: zEmailRequired,
  password: zStringRequired,
})

const SignUpPage: NextPageWithLayout = () => {
  const router = useRouter()

  const { formik, alertProps, buttonProps } = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: zSignUpInput,
    onSubmit: async (values) => {
      const result = await clientApi.signUp.fetcher(values)
      // avoid flashing of the page
      setTokenSilently(result.value)
      // TODO: backend, please, return slug from /api/login
      const me = await clientApi.getProfile.fetcher()
      await router.push(getUserRoute(me.slug))
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

export default withAllWrappers(SignUpPage)
