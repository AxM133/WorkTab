import { createRandom, hashString } from '@/lib/random'
import { PEOPLE } from './people'

const POSITIVE = [
  'Отличная работа! Всё сделано в срок и даже быстрее. Учёл все пожелания, предложил несколько вариантов на выбор. Однозначно буду обращаться ещё.',
  'Очень доволен результатом. Исполнитель всегда был на связи, быстро вносил правки и объяснял каждое решение. Рекомендую!',
  'Профессиональный подход: сначала разобрался в задаче, задал правильные вопросы и только потом приступил к работе. Результат превзошёл ожидания.',
  'Работаем уже не первый раз — стабильно высокое качество и чёткое соблюдение сроков. Спасибо за проделанную работу!',
  'Всё супер, работа выполнена аккуратно и качественно. Небольшие правки внесли за пару часов.',
  'Быстро, качественно, без лишних вопросов. Приятно работать с человеком, который знает своё дело.',
  'Задачу поняли с полуслова. Получили именно то, что хотели, плюс полезные рекомендации на будущее.',
]

const NEGATIVE = [
  'Результат в целом устроил, но сроки сорвались на несколько дней, пришлось поторопить.',
  'Работа выполнена, но потребовалось много правок — с первого раза не попали в задачу.',
  'Коммуникация могла быть лучше: на сообщения отвечали с большой задержкой.',
  'Ожидал немного другого качества за эту стоимость. Часть работы пришлось доделывать самим.',
]

// id пользователя → [положительных, отрицательных]
const REVIEW_COUNTS = {
  'u-ernar': [65, 10],
  f1: [41, 3],
  f2: [58, 6],
  f3: [18, 1],
  f4: [77, 9],
  f5: [31, 2],
}

function generateReviews(targetId, positive, negative) {
  const random = createRandom(hashString(`reviews-${targetId}`))
  const make = (index, isPositive) => {
    const author = random.pick(PEOPLE)
    return {
      id: `${targetId}-r${index}`,
      targetId,
      author,
      rating: isPositive ? random.pick([4, 4.5, 5, 5, 5]) : random.pick([2, 3, 3.5]),
      text: random.pick(isPositive ? POSITIVE : NEGATIVE),
      date: new Date(Date.now() - random.int(1, 900) * 86_400_000).toISOString(),
    }
  }

  return [
    ...Array.from({ length: positive }, (_, i) => make(i, true)),
    ...Array.from({ length: negative }, (_, i) => make(positive + i, false)),
  ].sort((a, b) => new Date(b.date) - new Date(a.date))
}

export const REVIEWS = Object.entries(REVIEW_COUNTS).flatMap(([targetId, [positive, negative]]) =>
  generateReviews(targetId, positive, negative),
)
