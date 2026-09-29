/** Статусы сделок (покупки ворков / выполненные работы) */
export const DEAL_STATUS = {
  in_progress: { label: 'Выполняется', badgeClassName: 'bg-accent' },
  done: { label: 'Завершено', badgeClassName: 'bg-primary' },
}

/** Статусы заказов на бирже */
export const ORDER_STATUS = {
  open: { label: 'Прием ставок', className: 'text-accent' },
  done: { label: 'Завершено', className: 'text-primary' },
  closed: { label: 'Закрыт', className: 'text-danger' },
}

export const SORT_OPTIONS = [
  { value: 'price-asc', label: 'По возрастанию цены' },
  { value: 'price-desc', label: 'По убыванию цены' },
  { value: 'date-desc', label: 'Сначала новые' },
  { value: 'date-asc', label: 'Сначала старые' },
]

/** Сортировка по значению из SORT_OPTIONS. getPrice / getDate — как достать поля из элемента */
export function sortItems(items, sort, { getPrice = (item) => item.price, getDate = (item) => item.date } = {}) {
  const sorted = [...items]
  const time = (item) => new Date(getDate(item)).getTime()

  switch (sort) {
    case 'price-asc':
      return sorted.sort((a, b) => getPrice(a) - getPrice(b))
    case 'price-desc':
      return sorted.sort((a, b) => getPrice(b) - getPrice(a))
    case 'date-asc':
      return sorted.sort((a, b) => time(a) - time(b))
    default:
      return sorted.sort((a, b) => time(b) - time(a))
  }
}
