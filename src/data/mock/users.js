import demoFreelancerAvatar from '@/assets/images/demo-freelancer.jpg'
import { ROLES } from '@/constants/profile'
import { TOP_FREELANCERS } from './freelancers'

const monthsAgo = (months) => new Date(Date.now() - months * 30 * 86_400_000).toISOString()

/** Демо-доступы для проверки ЛК. Убрать вместе с моками, когда появится сервер */
export const DEMO_PASSWORD = 'demo1234'
export const DEMO_ACCOUNTS = [
  { role: ROLES.freelancer, label: 'Фрилансер', email: 'demo@worktap.kz' },
  { role: ROLES.client, label: 'Заказчик', email: 'client@worktap.kz' },
]

const DEMO_FREELANCER = {
  id: 'u-ernar',
  role: ROLES.freelancer,
  firstName: 'Ернар',
  lastName: 'Ибрагимов',
  email: 'demo@worktap.kz',
  phone: '+7 701 000 00 01',
  password: DEMO_PASSWORD,
  avatar: demoFreelancerAvatar,
  isOnline: true,
  createdAt: monthsAgo(37),
  profile: {
    specialization: 'Дизайнер',
    categoryId: 'design',
    services: ['Дизайн сайтов', 'Дизайн логотипа', 'Флаера и брошюры', 'Баннеры и стенды'],
    skills: ['Figma', 'Adobe Photoshop', 'Adobe Illustrator', 'Corel Draw', 'Adobe After Effects', 'HTML/CSS'],
    about:
      'Работаю дизайнером с 1999 года. Был опыт в газетах, журналах, типографиях, рекламных агентствах, издательских домах… Порядка 8 лет занимаюсь логотипами и фирменными стилями.',
    country: 'Казахстан',
    city: 'Алматы',
    education: ['Казахстан, КазНУ, Бакалавр', 'Казахстан, КБТУ, Магистратура'],
    languages: ['Казахский', 'Русский'],
    certificates: ['Сертификат 1, 2020 года', 'Сертификат 2, 2021 года'],
  },
}

const DEMO_CLIENT = {
  id: 'u-client',
  role: ROLES.client,
  firstName: 'Айгерим',
  lastName: 'Садыкова',
  email: 'client@worktap.kz',
  phone: '+7 702 000 00 02',
  password: DEMO_PASSWORD,
  avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
  isOnline: true,
  createdAt: monthsAgo(14),
  profile: {
    about:
      'Развиваю сеть магазинов детской одежды. Ищу дизайнеров, разработчиков и маркетологов для долгосрочного сотрудничества.',
    country: 'Казахстан',
    city: 'Астана',
  },
}

// Дополнительные данные профиля для «Топ фрилансеров» с главной
const TOP_PROFILES = {
  f1: {
    categoryId: 'development',
    services: ['Сайты под ключ', 'Доработка сайта', 'Боты'],
    skills: ['PHP', 'Laravel', 'MySQL', 'JavaScript', 'Docker'],
    about:
      'Backend-разработчик с 7-летним опытом. Делаю сайты и сервисы на Laravel, интегрирую платёжные системы и CRM.',
    city: 'Алматы',
    languages: ['Русский', 'Английский'],
  },
  f2: {
    categoryId: 'texts',
    services: ['Копирайтинг', 'Рерайтинг', 'Сценарии'],
    skills: ['Копирайтинг', 'SEO-тексты', 'Сторителлинг', 'Редактура'],
    about:
      'Пишу тексты, которые продают: лендинги, email-рассылки, посты и сценарии для роликов. Более 100 выполненных проектов.',
    city: 'Шымкент',
    languages: ['Русский', 'Казахский'],
  },
  f3: {
    categoryId: 'design',
    services: ['Дизайн сайтов', 'Дизайн презентации'],
    skills: ['Figma', 'Adobe Photoshop', 'Tilda', 'UI/UX'],
    about: 'Проектирую удобные и красивые интерфейсы для сайтов и приложений. Работаю в Figma, собираю сайты на Tilda.',
    city: 'Астана',
    languages: ['Русский', 'Английский'],
  },
  f4: {
    categoryId: 'smm',
    services: ['Таргетинг', 'Контекстная реклама', 'Ведение соцсетей'],
    skills: ['Таргетированная реклама', 'Google Ads', 'Instagram', 'Аналитика'],
    about:
      'Интернет-маркетолог. Настраиваю рекламу, считаю окупаемость и выстраиваю воронки продаж для малого бизнеса.',
    city: 'Караганда',
    languages: ['Русский'],
  },
  f5: {
    categoryId: 'media',
    services: ['Анимация', 'Монтаж видео'],
    skills: ['Adobe After Effects', 'Cinema 4D', 'Adobe Premiere Pro'],
    about: 'Motion-дизайнер: анимированные логотипы, объясняющие ролики и рекламные креативы для соцсетей.',
    city: 'Алматы',
    languages: ['Русский', 'Казахский', 'Английский'],
  },
}

const topFreelancers = TOP_FREELANCERS.map((freelancer, index) => {
  const [firstName, lastName] = freelancer.name.split(' ')
  const { city, ...profile } = TOP_PROFILES[freelancer.id]
  return {
    id: freelancer.id,
    role: ROLES.freelancer,
    firstName,
    lastName,
    email: null,
    password: null,
    avatar: freelancer.avatar,
    isOnline: freelancer.isOnline,
    completedProjects: freelancer.completedProjects,
    createdAt: monthsAgo(18 + index * 7),
    profile: {
      specialization: freelancer.specialization,
      country: 'Казахстан',
      city,
      education: [],
      certificates: [],
      ...profile,
    },
  }
})

/** Пользователи, которые «уже есть на сервере». Зарегистрированные добавляются в localStorage */
export const SEED_USERS = [DEMO_FREELANCER, DEMO_CLIENT, ...topFreelancers]
