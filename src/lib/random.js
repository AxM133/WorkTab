/**
 * Детерминированный генератор случайных чисел (mulberry32).
 * Нужен для моковых данных: при каждой загрузке получаем одни и те же «случайные» значения.
 */
export function createRandom(seed) {
  let state = seed >>> 0
  const next = () => {
    state = (state + 0x6d2b79f5) >>> 0
    let t = state
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }

  return {
    next,
    int: (min, max) => Math.floor(next() * (max - min + 1)) + min,
    pick: (items) => items[Math.floor(next() * items.length)],
  }
}

/** Числовой seed из строки (id пользователя и т.п.) */
export function hashString(value) {
  let hash = 0
  for (const char of value) hash = (Math.imul(31, hash) + char.charCodeAt(0)) | 0
  return hash >>> 0
}
