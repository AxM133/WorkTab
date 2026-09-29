import { BagIcon, BriefcaseIcon, ListIcon, SettingsIcon, StarIcon, UserIcon } from '@/components/icons'
import { ROLES } from './profile'
import { ROUTES } from './routes'

export const MAIN_NAV = [
  { label: 'Биржа', to: ROUTES.exchange },
  { label: 'Ворки', to: ROUTES.works },
  { label: 'Конкурсы', to: ROUTES.contests },
  { label: 'Создать ворк', to: ROUTES.createWork },
  { label: 'Создать заказ', to: ROUTES.createOrder },
]

// Меню авторизованного пользователя (по макету ЛК)
export const USER_NAV = [
  { label: 'Биржа', to: ROUTES.exchange },
  { label: 'Ворки', to: ROUTES.works },
  { label: 'Конкурсы', to: ROUTES.contests },
  { label: 'Создать заказ', to: ROUTES.createOrder },
]

/** Пункты выпадающего меню профиля: у заказчика — история покупок, у фрилансера — выполненные работы */
export function getAccountLinks(role) {
  return [
    { label: 'Мой профиль', to: ROUTES.account, icon: UserIcon },
    { label: 'Мои заказы', to: ROUTES.myOrders, icon: ListIcon },
    role === ROLES.freelancer
      ? { label: 'Выполненные работы', to: ROUTES.completed, icon: BriefcaseIcon }
      : { label: 'История покупок', to: ROUTES.purchases, icon: BagIcon },
    { label: 'Избранные ворки', to: ROUTES.favorites, icon: StarIcon },
    { label: 'Настройки профиля', to: ROUTES.accountEdit, icon: SettingsIcon },
  ]
}

export const FOOTER_COLUMNS = [
  {
    title: 'Топ категории',
    links: [
      { label: 'Тексты и переводы', to: `${ROUTES.works}?category=texts` },
      { label: 'Разработка', to: `${ROUTES.works}?category=development` },
      { label: 'Дизайн', to: `${ROUTES.works}?category=design` },
      { label: 'Аудио, видео монтаж', to: `${ROUTES.works}?category=media` },
      { label: 'Соцсети и реклама', to: `${ROUTES.works}?category=smm` },
      { label: 'Бизнес и жизнь', to: `${ROUTES.works}?category=business` },
      { label: 'SEO и оптимизация', to: `${ROUTES.works}?category=seo` },
    ],
  },
  {
    title: 'О Проекте',
    links: [
      { label: 'О Нас', info: 'about' },
      { label: 'Как Это Работает', info: 'how-it-works' },
      { label: 'Политика Приватности', info: 'privacy' },
      { label: 'Правила Пользования', info: 'rules' },
      { label: 'Пресса о нас', to: '#press' },
    ],
  },
  {
    title: 'Поддержка',
    links: [
      { label: 'Контакты', to: '#contacts' },
      { label: 'Политика Безопасности', info: 'security' },
      { label: 'FAQ', to: '#faq' },
    ],
  },
]
