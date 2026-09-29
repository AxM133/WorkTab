import analytics from '@/assets/images/works/analytics.jpg'
import code from '@/assets/images/works/code.jpg'
import desk from '@/assets/images/works/desk.jpg'
import laptop from '@/assets/images/works/laptop.jpg'
import sketch from '@/assets/images/works/sketch.jpg'
import smm from '@/assets/images/works/smm.jpg'
import studio from '@/assets/images/works/studio.jpg'
import workspace from '@/assets/images/works/workspace.jpg'
import { createRandom, hashString } from '@/lib/random'

// Ворки (услуги) фрилансеров: authorId → параметры генерации
const CATALOG = {
  'u-ernar': {
    count: 19,
    price: [25_000, 120_000],
    covers: [desk, sketch, studio, workspace, laptop],
    titles: [
      'Дизайн сайта',
      'Дизайн логотипа',
      'Фирменный стиль под ключ',
      'Дизайн landing page',
      'Баннеры для соцсетей',
      'Дизайн интернет-магазина',
      'Брендбук компании',
      'Дизайн презентации',
      'Флаер и брошюра',
      'UI-кит для приложения',
      'Дизайн мобильного приложения',
      'Упаковка продукта',
      'Иконки для сайта',
      'Визитки',
      'Инфографика',
      'Редизайн сайта',
      'Обложки для YouTube',
      'Дизайн email-рассылки',
      'Карточки для маркетплейсов',
    ],
  },
  f1: {
    count: 6,
    price: [30_000, 250_000],
    covers: [code, laptop, analytics],
    titles: [
      'Сайт на Laravel под ключ',
      'Доработка сайта на PHP',
      'Интеграция платёжной системы',
      'REST API для приложения',
      'Парсер данных',
      'Ускорение сайта',
    ],
  },
  f2: {
    count: 6,
    price: [8_000, 45_000],
    covers: [sketch, workspace, desk],
    titles: [
      'Продающий текст для лендинга',
      'SEO-статья до 5000 знаков',
      'Описания товаров',
      'Сценарий рекламного ролика',
      'Посты на месяц',
      'Рерайт статей',
    ],
  },
  f3: {
    count: 6,
    price: [40_000, 180_000],
    covers: [desk, studio, workspace],
    titles: [
      'Дизайн сайта в Figma',
      'Сайт на Tilda под ключ',
      'Дизайн лендинга',
      'Прототип интерфейса',
      'Дизайн презентации',
      'Редизайн главной страницы',
    ],
  },
  f4: {
    count: 6,
    price: [20_000, 150_000],
    covers: [analytics, smm, laptop],
    titles: [
      'Настройка таргета в Instagram',
      'Контекстная реклама Google',
      'Маркетинговая стратегия',
      'Аудит рекламных кабинетов',
      'Ведение соцсетей',
      'Воронка продаж',
    ],
  },
  f5: {
    count: 6,
    price: [25_000, 200_000],
    covers: [studio, smm, laptop],
    titles: [
      'Анимация логотипа',
      'Объясняющий ролик',
      'Рекламный креатив для Reels',
      'Анимированная инфографика',
      'Интро для YouTube',
      'Монтаж видео',
    ],
  },
}

export const WORKS = Object.entries(CATALOG).flatMap(([authorId, { count, price, covers, titles }]) => {
  const random = createRandom(hashString(authorId))
  return Array.from({ length: count }, (_, index) => ({
    id: `${authorId}-w${index + 1}`,
    authorId,
    title: titles[index % titles.length],
    cover: covers[index % covers.length],
    price: Math.round(random.int(price[0], price[1]) / 1000) * 1000,
    rating: Math.round((4 + random.next()) * 2) / 2,
  }))
})
