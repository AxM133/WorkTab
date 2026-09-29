import { createRandom } from '@/lib/random'

const TITLES = [
  'Нужно сделать Дизайн сайта по тематике авто',
  'Разработать интернет-магазин детской одежды',
  'Настроить таргетированную рекламу в Instagram',
  'Написать тексты для 10 карточек товаров',
  'Сделать логотип и фирменный стиль',
  'Смонтировать рекламный ролик на 30 секунд',
  'Перенести сайт на новый хостинг',
  'Подготовить презентацию для инвесторов',
  'SEO-аудит интернет-магазина',
  'Нарисовать иллюстрации для упаковки',
]

const DESCRIPTION =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mus volutpat sollicitudin in ligula. Massa in ultricies vitae varius habitasse. Est lacus eros nec fermentum, id gravida. Dui aliquet dolor convallis mauris. Massa in ultricies vitae varius habitasse. Est lacus eros nec fermentum, id gravida.'

const STATUSES = ['open', 'done', 'closed', 'done', 'done', 'open', 'done', 'closed', 'open', 'done']

/** Заказы, опубликованные демо-заказчиком («Мои заказы») */
export const ORDERS = (() => {
  const random = createRandom(512)
  return TITLES.map((title, index) => ({
    id: `o${index + 1}`,
    customerId: 'u-client',
    title,
    description: DESCRIPTION,
    budget: Math.round(random.int(20_000, 300_000) / 5000) * 5000,
    status: STATUSES[index],
    proposals: random.int(3, 60),
    // первые заказы — несколько часов назад, дальше — дни
    date: new Date(Date.now() - (index < 3 ? random.int(30, 1200) : random.int(1, 60) * 1440) * 60_000).toISOString(),
  }))
})()
