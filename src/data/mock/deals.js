import { createRandom } from '@/lib/random'
import { PEOPLE } from './people'
import { WORKS } from './portfolio'

const daysAgo = (days) => new Date(Date.now() - days * 86_400_000).toISOString()

/** Покупки ворков демо-заказчика («История покупок») */
export const PURCHASES = (() => {
  const random = createRandom(2024)
  return Array.from({ length: 65 }, (_, index) => {
    const work = random.pick(WORKS)
    return {
      id: `p${index + 1}`,
      buyerId: 'u-client',
      workId: work.id,
      price: work.price,
      status: random.next() < 0.2 ? 'in_progress' : 'done',
      date: daysAgo(random.int(0, 420)),
    }
  })
})()

/** Продажи фрилансеров («Выполненные работы») */
export const SALES = (() => {
  const random = createRandom(7331)
  const counts = { 'u-ernar': 24, f1: 8, f2: 10, f3: 6, f4: 12, f5: 7 }

  return Object.entries(counts).flatMap(([sellerId, count]) => {
    const ownWorks = WORKS.filter((work) => work.authorId === sellerId)
    return Array.from({ length: count }, (_, index) => {
      const work = random.pick(ownWorks)
      const status = random.next() < 0.2 ? 'in_progress' : 'done'
      return {
        id: `${sellerId}-s${index + 1}`,
        sellerId,
        workId: work.id,
        customer: random.pick(PEOPLE),
        price: work.price,
        status,
        rating: status === 'done' && random.next() < 0.7 ? random.pick([4, 4.5, 5, 5]) : null,
        date: daysAgo(random.int(0, 500)),
      }
    })
  })
})()
