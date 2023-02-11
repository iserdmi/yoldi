import { Alert } from '@/components/Alert'
import { Button } from '@/components/Button'
import { Form, FormButtonsAndAlert, FormInputs, useForm } from '@/components/Form'
import { Input } from '@/components/Input'
import { Title } from '@/components/Title'
import { zStringOptional, zStringRequired } from '@/utils/zod'
import { Dispatch, SetStateAction } from 'react'
import { z } from 'zod'
import { Textarea } from '../Textarea'
import css from './index.module.scss'
import { User } from '@/api'

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
  const { formik, alertProps, buttonProps } = useForm({
    initialValues: {
      name: user.name,
      slug: user.slug,
      description: user.description || '',
    },
    validationSchema: zEditProfileInput,
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
