/**
 * Доступ к данным ЛК (ворки, отзывы, сделки, заказы). Сейчас читает моки,
 * позже функции станут запросами к API.
 */
import { PURCHASES, SALES } from '@/data/mock/deals'
import { ORDERS } from '@/data/mock/orders'
import { WORKS } from '@/data/mock/portfolio'
import { REVIEWS } from '@/data/mock/reviews'
import { getUserById } from './authService'

/** Ворк вместе с автором (имя, аватар, число выполненных проектов) */
export function getWork(workId) {
  const work = WORKS.find((item) => item.id === workId)
  if (!work) return null
  const author = getUserById(work.authorId)
  return { ...work, author: author && { ...author, completedProjects: getCompletedCount(author) } }
}

export const getWorksByAuthor = (authorId) => WORKS.filter((work) => work.authorId === authorId)

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
