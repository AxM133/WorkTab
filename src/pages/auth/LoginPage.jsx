import { useState } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { GoogleIcon } from '@/components/icons'
import { Button, Checkbox, Input } from '@/components/ui'
import { ROUTES } from '@/constants/routes'
import { DEMO_ACCOUNTS, DEMO_PASSWORD } from '@/data/mock/users'
import { useAuth } from '@/hooks/useAuth'
import { AuthHeading } from './AuthHeading'
import { validateEmail } from './validation'

export function LoginPage() {
  const { user, login } = useAuth()
  const location = useLocation()
  const [values, setValues] = useState({ email: '', password: '', remember: true })
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // после входа возвращаем туда, откуда пользователя отправили на логин
  if (user) return <Navigate to={location.state?.from?.pathname ?? ROUTES.account} replace />

  const setField = (field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
    setFormError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = { email: validateEmail(values.email), password: values.password ? undefined : 'Введите пароль' }
    if (nextErrors.email || nextErrors.password) {
      setErrors(nextErrors)
      return
    }

    setIsSubmitting(true)
    try {
      await login(values)
    } catch (error) {
      setFormError(error.message)
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <AuthHeading title="С возвращением!" subtitle="Войдите, чтобы заказывать услуги и управлять своими проектами" />

      <form onSubmit={handleSubmit} noValidate className="flex animate-fade-up flex-col gap-5 [animation-delay:100ms]">
        {formError && (
          <p className="animate-fade-up rounded-xl bg-danger/10 px-4 py-3 text-sm text-danger" role="alert">
            {formError}
          </p>
        )}

        <Input
          label="Email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={(event) => setField('email', event.target.value)}
          placeholder="you@example.com"
          error={errors.email}
        />
        <Input
          label="Пароль"
          type="password"
          autoComplete="current-password"
          value={values.password}
          onChange={(event) => setField('password', event.target.value)}
          placeholder="Введите пароль"
          error={errors.password}
        />

        <div className="flex items-center justify-between gap-4">
          <Checkbox
            label="Запомнить меня"
            checked={values.remember}
            onChange={(event) => setField('remember', event.target.checked)}
          />
          <Link to={ROUTES.forgotPassword} className="text-sm font-medium text-primary hover:underline">
            Забыли пароль?
          </Link>
        </div>

        <Button type="submit" size="lg" fullWidth loading={isSubmitting} className="mt-2 text-base">
          Войти
        </Button>

        <div className="flex items-center gap-4 text-xs text-muted">
          <span className="h-px flex-1 bg-line" />
          или
          <span className="h-px flex-1 bg-line" />
        </div>

        <Button
          variant="dark"
          size="lg"
          fullWidth
          className="text-base"
          onClick={() => setFormError('Вход через Google станет доступен после подключения сервера')}
        >
          <GoogleIcon className="size-5 rounded-full bg-white p-0.5" />
          Войти через Google
        </Button>
      </form>

      <p className="mt-8 animate-fade-up text-center text-sm [animation-delay:200ms]">
        Нет аккаунта?{' '}
        <Link to={ROUTES.register} className="font-semibold text-primary hover:underline">
          Зарегистрироваться
        </Link>
      </p>

      {/* Демо-доступ для проверки ЛК — убрать вместе с моками */}
      <div className="mt-8 animate-fade-up rounded-2xl bg-surface p-4 text-xs [animation-delay:300ms]">
        <p className="font-semibold">Демо-аккаунты (пароль {DEMO_PASSWORD})</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {DEMO_ACCOUNTS.map((account) => (
            <button
              key={account.email}
              type="button"
              onClick={() => setValues((prev) => ({ ...prev, email: account.email, password: DEMO_PASSWORD }))}
              className="rounded-full border border-lavender-dark bg-white px-3 py-1.5 transition-colors hover:border-primary hover:text-primary"
            >
              {account.label}: {account.email}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}
