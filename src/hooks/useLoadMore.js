import { useState } from 'react'

/**
 * Клиентская пагинация для кнопки «Загрузить еще».
 * resetKey — при его смене (фильтр, сортировка, вкладка) список снова показывается с начала.
 */
export function useLoadMore(items, { initial = 12, step = 8, resetKey } = {}) {
  const [state, setState] = useState({ resetKey, count: initial })

  let count = state.count
  if (state.resetKey !== resetKey) {
    count = initial
    setState({ resetKey, count })
  }

  return {
    visible: items.slice(0, count),
    hasMore: count < items.length,
    loadMore: () => setState((prev) => ({ ...prev, count: prev.count + step })),
  }
}
