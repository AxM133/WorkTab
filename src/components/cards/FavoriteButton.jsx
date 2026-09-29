import { useLocation, useNavigate } from 'react-router-dom'
import { StarIcon } from '@/components/icons'
import { ROUTES } from '@/constants/routes'
import { useAuth } from '@/hooks/useAuth'
import { useFavorites } from '@/hooks/useFavorites'
import { cn } from '@/lib/cn'

/** Звезда «в избранное» поверх обложки ворка. Гостя отправляет на вход */
export function FavoriteButton({ workId, className }) {
  const { user } = useAuth()
  const { isFavorite, toggle } = useFavorites()
  const navigate = useNavigate()
  const location = useLocation()
  const isActive = isFavorite(workId)

  const handleClick = () => {
    if (!user) {
      navigate(ROUTES.login, { state: { from: location } })
      return
    }
    toggle(workId)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={isActive}
      aria-label={isActive ? 'Убрать из избранного' : 'Добавить в избранное'}
      className={cn(
        'flex size-9 items-center justify-center rounded-full bg-white/85 shadow-soft backdrop-blur transition-[scale,background-color] duration-200 hover:scale-110 hover:bg-white active:scale-90',
        className,
      )}
    >
      {/* key перезапускает анимацию «pop» при каждом переключении */}
      <StarIcon key={String(isActive)} className={cn('size-5 animate-pop', isActive ? 'text-accent' : 'text-lilac')} />
    </button>
  )
}
