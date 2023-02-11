import { FormikConfig, FormikHelpers, FormikValues, useFormik } from 'formik'
import React, { useMemo, useState } from 'react'
import { z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { AlertProps } from '@/components/Alert'
import { ButtonProps } from '@/components/Button'
import css from './index.module.scss'
import cn from 'classnames'

type ValuesType<TMaybeZodSchema> = TMaybeZodSchema extends z.ZodTypeAny ? z.infer<TMaybeZodSchema> : {}

export const useForm = <TMaybeZodSchema extends z.ZodTypeAny | undefined = undefined>({
  successMessage = false,
  resetOnSuccess = false,
  showValidationAlert = false,
  initialValues,
  validationSchema,
  onSubmit,
  disableButtonUntilValid = false,
  ...restProps
}: {
  successMessage?: string | false
  resetOnSuccess?: boolean
  showValidationAlert?: boolean
  initialValues?: ValuesType<TMaybeZodSchema>
  validationSchema?: TMaybeZodSchema
  onSubmit?: (
    values: ValuesType<TMaybeZodSchema>,
    actions: FormikHelpers<ValuesType<TMaybeZodSchema>>
  ) => Promise<any> | any
  disableButtonUntilValid?: boolean
} & FormikConfig<ValuesType<TMaybeZodSchema>>) => {
  const [successMessageVisible, setSuccessMessageVisible] = useState(false)
  const [submittingError, setSubmittingError] = useState<Error | null>(null)

  const formik = useFormik<ValuesType<TMaybeZodSchema>>({
    validateOnMount: true,
    initialValues: initialValues || ({} as any),
    ...(validationSchema && {
      validationSchema: toFormikValidationSchema(validationSchema),
    }),
    onSubmit: async (values, formikHelpers) => {
      if (!onSubmit) {
        return
      }
      try {
        setSubmittingError(null)
        await onSubmit(values, formikHelpers)
        if (resetOnSuccess) {
          formik.resetForm()
        }
        setSuccessMessageVisible(true)
        setTimeout(() => {
          setSuccessMessageVisible(false)
        }, 3000)
      } catch (error: any) {
        setSubmittingError(error)
      }
    },
    ...restProps,
  })

  const alertProps = useMemo<AlertProps>(() => {
    if (submittingError) {
      return {
        hidden: false,
        children: submittingError.message,
        color: 'red',
      }
    }
    if (showValidationAlert && !formik.isValid && !!formik.submitCount) {
      return {
        hidden: false,
        children: 'Some fields are invalid',
        color: 'red',
      }
    }
    if (successMessageVisible && successMessage) {
      return {
        hidden: false,
        children: successMessage,
        color: 'green',
      }
    }
    return {
      color: 'red',
      hidden: true,
      children: null,
    }
  }, [submittingError, formik.isValid, formik.submitCount, successMessageVisible, successMessage, showValidationAlert])

  const buttonProps = useMemo<Partial<ButtonProps>>(() => {
    return {
      loading: formik.isSubmitting,
      disabled: disableButtonUntilValid ? !formik.dirty || !formik.isValid || formik.isSubmitting : formik.isSubmitting,
    }
  }, [formik.isSubmitting, formik.isValid, formik.dirty, disableButtonUntilValid])

  return {
    formik,
    alertProps,
    buttonProps,
  }
}

export const Form = ({
  formik,
  children,
  className,
}: {
  formik: FormikValues
  children: React.ReactNode
  className?: string
}) => {
  return (
    <form onSubmit={formik.handleSubmit} className={className}>
      {children}
    </form>
  )
}

export const FormSegments = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={cn(css.formSegments, className)}>{children}</div>
}

export const FormInputs = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={cn(css.formInputs, className)}>{children}</div>
}

export const FormButtonsAndAlert = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={cn(css.formButtonsAndAlert, className)}>{children}</div>
}
