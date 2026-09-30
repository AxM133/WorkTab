/**
 * Доступ к данным ЛК (ворки, отзывы, сделки, заказы). Сейчас читает моки,
 * позже функции станут запросами к API.
 */
import { PURCHASES, SALES } from '@/data/mock/deals'
import { CONTESTS } from '@/data/mock/contests'
import { ORDERS } from '@/data/mock/orders'
import { WORKS } from '@/data/mock/portfolio'
import { REVIEWS } from '@/data/mock/reviews'
import { storage } from '@/lib/storage'
import { getUserById } from './authService'

const CREATED_WORKS_KEY = 'worktap:created-works'
const WORK_OVERRIDES_KEY = 'worktap:work-overrides'
const DELETED_WORKS_KEY = 'worktap:deleted-works'
const CREATED_CONTESTS_KEY = 'worktap:created-contests'
export const WORKS_CHANGE_EVENT = 'worktap:works-change'

const readCreatedWorks = () => storage.get(CREATED_WORKS_KEY, [])

function readRawWorks() {
  const overrides = storage.get(WORK_OVERRIDES_KEY, {})
  const deletedIds = storage.get(DELETED_WORKS_KEY, [])
  return [
    ...readCreatedWorks(),
    ...WORKS.filter((work) => !deletedIds.includes(work.id)).map((work) => ({ ...work, ...overrides[work.id] })),
  ]
}

function notifyWorksChanged() {
  window.dispatchEvent(new Event(WORKS_CHANGE_EVENT))
}

function withAuthor(work) {
  const author = getUserById(work.authorId)
  return { ...work, author: author && { ...author, completedProjects: getCompletedCount(author) } }
}

export function getWorks() {
  return readRawWorks().map(withAuthor)
}

/** Ворк вместе с автором (имя, аватар, число выполненных проектов) */
export function getWork(workId) {
  const work = readRawWorks().find((item) => item.id === workId)
  return work ? withAuthor(work) : null
}

export const getWorksByAuthor = (authorId) => getWorks().filter((work) => work.authorId === authorId)

export function createWork(values, authorId) {
  const work = {
    ...values,
    id: `work-${crypto.randomUUID()}`,
    authorId,
    rating: 0,
    createdAt: new Date().toISOString(),
  }
  storage.set(CREATED_WORKS_KEY, [work, ...readCreatedWorks()])
  notifyWorksChanged()
  return getWork(work.id)
}

export function updateWork(workId, values, authorId) {
  const currentWork = readRawWorks().find((work) => work.id === workId)
  if (!currentWork || currentWork.authorId !== authorId) return null

  const updatedWork = { ...currentWork, ...values, id: workId, authorId }
  const createdWorks = readCreatedWorks()
  if (createdWorks.some((work) => work.id === workId)) {
    storage.set(CREATED_WORKS_KEY, createdWorks.map((work) => (work.id === workId ? updatedWork : work)))
  } else {
    storage.set(WORK_OVERRIDES_KEY, {
      ...storage.get(WORK_OVERRIDES_KEY, {}),
      [workId]: updatedWork,
    })
  }

  notifyWorksChanged()
  return getWork(workId)
}

export function deleteWork(workId, authorId) {
  const currentWork = readRawWorks().find((work) => work.id === workId)
  if (!currentWork || currentWork.authorId !== authorId) return false

  const createdWorks = readCreatedWorks()
  if (createdWorks.some((work) => work.id === workId)) {
    storage.set(CREATED_WORKS_KEY, createdWorks.filter((work) => work.id !== workId))
  } else {
    const deletedIds = storage.get(DELETED_WORKS_KEY, [])
    storage.set(DELETED_WORKS_KEY, [...new Set([...deletedIds, workId])])
    const overrides = storage.get(WORK_OVERRIDES_KEY, {})
    delete overrides[workId]
    storage.set(WORK_OVERRIDES_KEY, overrides)
  }

  notifyWorksChanged()
  return true
}

export const getReviews = (userId) => REVIEWS.filter((review) => review.targetId === userId)

export const isPositiveReview = (review) => review.rating >= 4

export function getAverageRating(userId) {
  const reviews = getReviews(userId)
  if (!reviews.length) return 0
  const average = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
  return Math.round(average * 2) / 2
}

export function getCompletedCount(user) {
  return user.completedProjects ?? SALES.filter((sale) => sale.sellerId === user.id && sale.status === 'done').length
}

export const getPurchases = (userId) =>
  PURCHASES.filter((purchase) => purchase.buyerId === userId).map((purchase) => ({
    ...purchase,
    work: getWork(purchase.workId),
  }))

export const getSales = (userId) =>
  SALES.filter((sale) => sale.sellerId === userId).map((sale) => ({ ...sale, work: getWork(sale.workId) }))

export const getOrders = (userId) => ORDERS.filter((order) => order.customerId === userId)

export function getContests() {
  return [...storage.get(CREATED_CONTESTS_KEY, []), ...CONTESTS]
}

export function getContest(contestId) {
  return getContests().find((contest) => contest.id === contestId) ?? null
}

export function createContest(values, customerId) {
  const contest = {
    ...values,
    id: `contest-${crypto.randomUUID()}`,
    customerId,
    status: 'active',
    participants: 0,
    submissions: [],
    createdAt: new Date().toISOString(),
  }
  storage.set(CREATED_CONTESTS_KEY, [contest, ...storage.get(CREATED_CONTESTS_KEY, [])])
  return contest
}
