import { InfoLink } from '@/components/info/InfoLink'
import { Checkbox, Input } from '@/components/ui'
import { formatPhone } from '../validation'

/** Данные для входа — общие для заказчика и фрилансера */
export function AccountFields({ values, errors, onChange }) {
  const bind = (field) => ({
    value: values[field],
    error: errors[field],
    onChange: (event) => onChange(field, event.target.value),
  })

  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Input label="Имя" required autoComplete="given-name" placeholder="Ернар" {...bind('firstName')} />
        <Input label="Фамилия" required autoComplete="family-name" placeholder="Ибрагимов" {...bind('lastName')} />
      </div>
      <Input
        label="Email"
        required
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        {...bind('email')}
      />
      <Input
        label="Телефон"
        required
        type="tel"
        autoComplete="tel"
        placeholder="+7 777 123 45 67"
        {...bind('phone')}
        onChange={(event) => onChange('phone', formatPhone(event.target.value))}
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          label="Пароль"
          required
          type="password"
          autoComplete="new-password"
          hint="Минимум 8 символов, буквы и цифры"
          {...bind('password')}
        />
        <Input
          label="Повторите пароль"
          required
          type="password"
          autoComplete="new-password"
          {...bind('passwordConfirm')}
        />
      </div>
      <Checkbox
        checked={values.agree}
        onChange={(event) => onChange('agree', event.target.checked)}
        error={errors.agree}
        label={
          <>
            Я принимаю{' '}
            <InfoLink doc="rules" className="text-primary hover:underline">
              правила сервиса
            </InfoLink>{' '}
            и{' '}
            <InfoLink doc="privacy" className="text-primary hover:underline">
              политику конфиденциальности
            </InfoLink>
          </>
        }
      />
    </div>
  )
}
