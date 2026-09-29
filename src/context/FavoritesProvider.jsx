import { useCallback, useMemo, useState } from 'react'
import { WORKS } from '@/data/mock/portfolio'
import { useAuth } from '@/hooks/useAuth'
import { hashString } from '@/lib/random'
import { storage } from '@/lib/storage'
import { FavoritesContext } from './favorites-context'

const STORAGE_KEY = 'worktap:favorites'

// Стартовое избранное демо-аккаунтов
const SEED_FAVORITES = {
  'u-client': [...WORKS]
    .sort((a, b) => hashString(a.id) - hashString(b.id))
    .slice(0, 22)
    .map((work) => work.id),
  'u-ernar': WORKS.filter((work) => work.authorId !== 'u-ernar')
    .slice(0, 6)
    .map((work) => work.id),
}

function readFavorites(userId) {
  if (!userId) return []
  const all = storage.get(STORAGE_KEY, {})
  return all[userId] ?? SEED_FAVORITES[userId] ?? []
}

export function FavoritesProvider({ children }) {
  const { user } = useAuth()
  const userId = user?.id ?? null
  const [state, setState] = useState(() => ({ userId, ids: readFavorites(userId) }))

  // пользователь сменился (вход / выход) — подгружаем его избранное
  let ids = state.ids
  if (state.userId !== userId) {
    ids = readFavorites(userId)
    setState({ userId, ids })
  }

  const toggle = useCallback(
    (workId) => {
      if (!userId) return
      setState((prev) => {
        const next = prev.ids.includes(workId) ? prev.ids.filter((id) => id !== workId) : [workId, ...prev.ids]
        storage.set(STORAGE_KEY, { ...storage.get(STORAGE_KEY, {}), [userId]: next })
        return { ...prev, ids: next }
      })
    },
    [userId],
  )

  const value = useMemo(() => ({ ids, count: ids.length, isFavorite: (id) => ids.includes(id), toggle }), [ids, toggle])

  return <FavoritesContext value={value}>{children}</FavoritesContext>
}
