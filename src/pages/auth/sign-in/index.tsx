import { useRouter } from 'next/router'
import { z } from 'zod'
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
import { getUserRoute } from '@/utils/routes'
import { setTokenSilently } from '@/utils/token'
import { withAllWrappers } from '@/utils/withAllWrappers'
import { type NextPageWithLayout } from '@/utils/withLayouts'
import { zEmailRequired, zStringRequired } from '@/utils/zod'

const zSignInInput = z.object({
  email: zEmailRequired,
  password: zStringRequired,
})

export const getServerSideProps = withDefaultServerSideProps((ctx, defaultServerSideProps) => {
  if (defaultServerSideProps.props.me != null) {
    return {
      redirect: {
        permanent: false,
        destination: getUserRoute(defaultServerSideProps.props.me.slug),
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
      // avoid flashing of the page
      setTokenSilently(result.value)
      // TODO: backend, please, return slug from /api/sign-up
      const me = await clientApi.getProfile.fetcher()
      await router.push(getUserRoute(me.slug))
    },
    disableButtonUntilValid: true,
  })

  return (
    <div>
      <Meta title="Вход" />
      <Title as="h1">Вход в&nbsp;Yoldi&nbsp;Agency</Title>
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
