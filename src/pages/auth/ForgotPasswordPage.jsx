import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeftIcon, MailIcon } from '@/components/icons'
import { Button, Input } from '@/components/ui'
import { ROUTES } from '@/constants/routes'
import { requestPasswordReset } from '@/services/authService'
import { AuthHeading } from './AuthHeading'
import { validateEmail } from './validation'

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSent, setIsSent] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const emailError = validateEmail(email)
    if (emailError) {
      setError(emailError)
      return
    }
    setIsSubmitting(true)
    await requestPasswordReset(email)
    setIsSubmitting(false)
    setIsSent(true)
  }

  const backLink = (
    <Link
      to={ROUTES.login}
      className="mt-8 flex items-center justify-center gap-1 text-sm font-medium text-primary hover:underline"
    >
      <ChevronLeftIcon className="size-4" />
      Вернуться ко входу
    </Link>
  )

  if (isSent) {
    return (
      <div className="animate-fade-up text-center">
        <span className="mx-auto flex size-20 animate-pop items-center justify-center rounded-full bg-mint">
          <MailIcon className="size-9 text-primary" />
        </span>
        <h1 className="mt-6 text-2xl font-bold">Проверьте почту</h1>
        <p className="mt-3 text-sm text-body">
          Если аккаунт с адресом <span className="font-semibold text-ink">{email}</span> существует, мы отправили на
          него ссылку для восстановления пароля.
        </p>
        {/* пока нет почтового сервера — ссылка из письма доступна прямо здесь */}
        <Button to={ROUTES.resetPassword} variant="secondary" className="mt-8">
          Открыть ссылку из письма (демо)
        </Button>
        {backLink}
      </div>
    )
  }

  return (
    <>
      <AuthHeading
        title="Восстановление пароля"
        subtitle="Укажите email, который вы использовали при регистрации — мы пришлём ссылку для сброса пароля"
      />
      <form onSubmit={handleSubmit} noValidate className="flex animate-fade-up flex-col gap-5">
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value)
            setError('')
          }}
          placeholder="you@example.com"
          error={error}
        />
        <Button type="submit" size="lg" fullWidth loading={isSubmitting} className="text-base">
          Отправить ссылку
        </Button>
      </form>
      {backLink}
    </>
  )
}
