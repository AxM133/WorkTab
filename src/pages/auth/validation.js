const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validateEmail(email) {
  if (!email.trim()) return 'Введите email'
  if (!EMAIL_PATTERN.test(email.trim())) return 'Некорректный email'
  return undefined
}

export function validatePassword(password) {
  if (!password) return 'Введите пароль'
  if (password.length < 8) return 'Минимум 8 символов'
  if (!/[a-zA-Zа-яА-Я]/.test(password) || !/\d/.test(password)) return 'Пароль должен содержать буквы и цифры'
  return undefined
}

export function validateNewPassword({ password, passwordConfirm }) {
  const errors = {}
  const passwordError = validatePassword(password)
  if (passwordError) errors.password = passwordError
  if (!passwordConfirm) errors.passwordConfirm = 'Повторите пароль'
  else if (password !== passwordConfirm) errors.passwordConfirm = 'Пароли не совпадают'
  return errors
}

export function validateAccount(values) {
  const errors = { ...validateNewPassword(values) }
  if (!values.firstName.trim()) errors.firstName = 'Введите имя'
  if (!values.lastName.trim()) errors.lastName = 'Введите фамилию'
  const emailError = validateEmail(values.email)
  if (emailError) errors.email = emailError
  if (values.phone.replace(/\D/g, '').length < 10) errors.phone = 'Введите номер телефона полностью'
  if (!values.agree) errors.agree = 'Необходимо принять правила сервиса'
  return errors
}

/** Мягкая маска телефона: +7 777 123 45 67 */
export function formatPhone(input) {
  const digits = input.replace(/\D/g, '').replace(/^8/, '7').slice(0, 11)
  if (!digits) return ''
  const parts = [digits.slice(1, 4), digits.slice(4, 7), digits.slice(7, 9), digits.slice(9, 11)].filter(Boolean)
  return `+${digits[0]} ${parts.join(' ')}`.trim()
}
