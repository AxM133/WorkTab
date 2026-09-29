const priceFormatter = new Intl.NumberFormat('ru-RU')

export const formatPrice = (value) => `${priceFormatter.format(value)} тенге`

/** Склонение: pluralize(5, ['сделка', 'сделки', 'сделок']) → 'сделок' */
export function pluralize(count, [one, few, many]) {
  const mod10 = count % 10
  const mod100 = count % 100
  if (mod10 === 1 && mod100 !== 11) return one
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few
  return many
}

export const plural = (count, forms) => `${count} ${pluralize(count, forms)}`

const MINUTES = ['минуту', 'минуты', 'минут']
const HOURS = ['час', 'часа', 'часов']
const DAYS = ['день', 'дня', 'дней']
const MONTHS = ['месяц', 'месяца', 'месяцев']
const YEARS = ['год', 'года', 'лет']

export const formatDate = (date) =>
  new Date(date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })

/** «4 часа 28 минут назад», «3 дня назад» */
export function formatTimeAgo(date, now = Date.now()) {
  const minutes = Math.max(1, Math.floor((now - new Date(date).getTime()) / 60_000))
  if (minutes < 60) return `${plural(minutes, MINUTES)} назад`

  const hours = Math.floor(minutes / 60)
  if (hours < 24) {
    const rest = minutes % 60
    return `${plural(hours, HOURS)}${rest ? ` ${plural(rest, MINUTES)}` : ''} назад`
  }

  const days = Math.floor(hours / 24)
  if (days < 30) return `${plural(days, DAYS)} назад`
  return formatDate(date)
}

/** Сколько пользователь на сайте: «3 года», «5 месяцев» */
export function formatSiteDuration(createdAt, now = Date.now()) {
  const days = Math.floor((now - new Date(createdAt).getTime()) / 86_400_000)
  if (days < 1) return 'Меньше дня'
  if (days < 30) return plural(days, DAYS)
  const months = Math.floor(days / 30)
  if (months < 12) return plural(months, MONTHS)
  return plural(Math.floor(months / 12), YEARS)
}

export const getFullName = (user) => `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim()

export const getInitials = (name = '') =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
