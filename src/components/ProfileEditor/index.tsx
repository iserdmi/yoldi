import { User, clientApi } from '@/api'
import { Alert } from '@/components/Alert'
import { Button } from '@/components/Button'
import { Form, FormButtonsAndAlert, FormInputs, useForm } from '@/components/Form'
import { Input } from '@/components/Input'
import { Title } from '@/components/Title'
import { notify } from '@/utils/notify'
import { getUserRoute } from '@/utils/routes'
import { zStringOptional, zStringRequired } from '@/utils/zod'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction } from 'react'
import { z } from 'zod'
import { Textarea } from '../Textarea'
import css from './index.module.scss'

const zEditProfileInput = z.object({
  name: zStringRequired,
  slug: zStringRequired.regex(
    /^[a-zA-Z0-9-_\.]+$/,
    'Разрешены только латинские буквы, цифры, дефис, нижнее подчёркивание и точка'
  ),
  description: zStringOptional,
})

export const ProfileEditor = ({
  user,
  setEditorOpen,
}: {
  user: User
  setEditorOpen: Dispatch<SetStateAction<boolean>>
}) => {
  const router = useRouter()
  const { formik, alertProps, buttonProps } = useForm({
    initialValues: {
      name: user.name,
      slug: user.slug,
      description: user.description || '',
    },
    enableReinitialize: true,
    validationSchema: zEditProfileInput,
    onSubmit: async (values) => {
      const newUser = await clientApi.patchProfile.fetcher(values)
      clientApi.getProfile.mutate(newUser)
      if (newUser.slug !== user.slug) {
        clientApi.getUser.mutate({ slug: newUser.slug }, newUser)
        router.replace(getUserRoute(newUser.slug), undefined, { shallow: true }).then(() => {
          // corner case. on route replace default notification will be missing
          notify({
            message: 'Профиль успешно обновлён',
            type: 'success',
          })
        })
      } else {
        clientApi.getUser.mutate({ slug: user.slug }, newUser)
      }
      setEditorOpen(false)
    },
    disableButtonUntilValid: true,
    successMessage: 'Профиль успешно обновлён',
    successMessagePolicy: 'toast',
  })

  return (
    <div className={css.profileEditor}>
      <Title className={css.title} as="h1">
        Редактировать профиль
      </Title>
      <Form className={css.form} formik={formik}>
        <FormInputs className={css.formInputs}>
          <Input name="name" label="Имя" formik={formik} />
          <Input textBefore="example.com/" name="slug" label="Адрес профиля" formik={formik} />
          <Textarea name="description" label="Описание" formik={formik} />
        </FormInputs>
        <FormButtonsAndAlert className={css.formButtonsAndAlert}>
          <Alert {...alertProps} />
          <div className={css.buttons}>
            <Button
              disabled={formik.isSubmitting}
              type="button"
              size="m"
              style="outline"
              onClick={() => setEditorOpen(false)}
            >
              Отмена
            </Button>
            <Button type="submit" size="m" style="black" {...buttonProps}>
              Сохранить
            </Button>
          </div>
        </FormButtonsAndAlert>
      </Form>
    </div>
  )
}
