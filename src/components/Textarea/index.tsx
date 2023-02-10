import cn from 'classnames'
import { FormikProps } from 'formik'
import css from './index.module.scss'
import autosize from 'autosize'
import { useEffect, useRef } from 'react'

export type TextareaProps = {
  label?: string
  placeholder?: string
  name: string
  formik: FormikProps<any>
}
export const Textarea = ({ label, name, formik }: TextareaProps) => {
  const value = formik.values[name] as string
  const error = formik.errors[name] as string | undefined
  const touched = formik.touched[name] as boolean
  const invalid = touched && !!error
  const disabled = formik.isSubmitting

  const elRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (elRef.current) {
      autosize(elRef.current)
    }
  }, [elRef])

  return (
    <div className={cn({ [css.field]: true, [css.disabled]: disabled })}>
      {label && (
        <label className={css.label} htmlFor={name}>
          {label}
        </label>
      )}
      <div className={css.inputWrapper}>
        <textarea
          ref={elRef}
          className={cn({ [css.input]: true, [css.invalid]: invalid })}
          disabled={disabled}
          onChange={(e) => formik.setFieldValue(name, e.target.value)}
          onBlur={() => formik.setFieldTouched(name)}
          value={value}
          name={name}
          id={name}
        />
      </div>
      {invalid && <div className={css.error}>{error}</div>}
    </div>
  )
}
