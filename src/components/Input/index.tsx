import cn from 'classnames'
import { FormikProps } from 'formik'
import css from './index.module.scss'
import { Icon, IconName } from '../Icon'

export type InputProps = {
  label?: string
  placeholder?: string
  name: string
  formik: FormikProps<any>
  type?: 'text' | 'password'
  leftIconName?: IconName
  rightIconElement?: React.ReactNode
  textBefore?: string
}
export const Input = ({
  label,
  placeholder,
  name,
  formik,
  type = 'text',
  leftIconName,
  rightIconElement,
  textBefore,
}: InputProps) => {
  const value = formik.values[name] as string
  const error = formik.errors[name] as string | undefined
  const touched = formik.touched[name] as boolean
  const invalid = touched && !!error
  const disabled = formik.isSubmitting

  return (
    <div className={cn({ [css.field]: true, [css.disabled]: disabled })}>
      {label && (
        <label className={css.label} htmlFor={name}>
          {label}
        </label>
      )}
      <div
        className={cn({
          [css.inputWrapper]: true,
          [css.withLeftIcon]: !!leftIconName,
          [css.withRightIcon]: !!rightIconElement,
          [css.withTextBefore]: !!textBefore,
        })}
      >
        {!!leftIconName && <Icon name={leftIconName} className={css.leftIcon} />}
        {!!textBefore && <div className={css.textBefore}>{textBefore}</div>}
        <input
          className={cn({ [css.input]: true, [css.invalid]: invalid })}
          disabled={disabled}
          type={type}
          placeholder={placeholder}
          onChange={(e) => formik.setFieldValue(name, e.target.value)}
          onBlur={() => formik.setFieldTouched(name)}
          value={value}
          name={name}
          id={name}
        />
        {!!rightIconElement && <div className={css.rightIcon}>{rightIconElement}</div>}
      </div>
      {invalid && <div className={css.error}>{error}</div>}
    </div>
  )
}
