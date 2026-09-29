import { use } from 'react'
import { FavoritesContext } from '@/context/favorites-context'

export function useFavorites() {
  const context = use(FavoritesContext)
  if (!context) throw new Error('useFavorites нужно вызывать внутри <FavoritesProvider>')
  return context
}
