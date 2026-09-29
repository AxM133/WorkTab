import { useState } from 'react'
import { CheckIcon } from '@/components/icons'
import { Button, Input } from '@/components/ui'
import { ROUTES } from '@/constants/routes'
import { resetPassword } from '@/services/authService'
import { AuthHeading } from './AuthHeading'
import { validateNewPassword } from './validation'

export function ResetPasswordPage() {
  const [values, setValues] = useState({ password: '', passwordConfirm: '' })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDone, setIsDone] = useState(false)

  const setField = (field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = validateNewPassword(values)
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      return
    }
    setIsSubmitting(true)
    await resetPassword(values.password)
    setIsSubmitting(false)
    setIsDone(true)
  }

  if (isDone) {
    return (
      <div className="animate-fade-up text-center">
        <span className="mx-auto flex size-20 animate-pop items-center justify-center rounded-full bg-mint">
          <CheckIcon className="size-9 text-primary" />
        </span>
        <h1 className="mt-6 text-2xl font-bold">Пароль изменён</h1>
        <p className="mt-3 text-sm text-body">Теперь вы можете войти с новым паролем</p>
        <Button to={ROUTES.login} size="lg" className="mt-8">
          Войти
        </Button>
      </div>
    )
  }

  return (
    <>
      <AuthHeading title="Новый пароль" subtitle="Придумайте надёжный пароль: минимум 8 символов, буквы и цифры" />
      <form onSubmit={handleSubmit} noValidate className="flex animate-fade-up flex-col gap-5">
        <Input
          label="Новый пароль"
          type="password"
          autoComplete="new-password"
          value={values.password}
          onChange={(event) => setField('password', event.target.value)}
          error={errors.password}
        />
        <Input
          label="Повторите пароль"
          type="password"
          autoComplete="new-password"
          value={values.passwordConfirm}
          onChange={(event) => setField('passwordConfirm', event.target.value)}
          error={errors.passwordConfirm}
        />
        <Button type="submit" size="lg" fullWidth loading={isSubmitting} className="mt-2 text-base">
          Сохранить пароль
        </Button>
      </form>
    </>
  )
}
