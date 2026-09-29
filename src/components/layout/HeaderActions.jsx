import { useCallback, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { BellIcon, ChatIcon, StarIcon } from '@/components/icons'
import { ROLES } from '@/constants/profile'
import { ROUTES } from '@/constants/routes'
import { useAuth } from '@/hooks/useAuth'
import { useClickOutside } from '@/hooks/useClickOutside'
import { useEscapeKey } from '@/hooks/useEscapeKey'
import { useFavorites } from '@/hooks/useFavorites'
import { cn } from '@/lib/cn'

// Пока нет сервера — фиксированные уведомления для каждой роли
const NOTIFICATIONS = {
  [ROLES.freelancer]: [
    { id: 1, text: 'Новый заказ в категории «Дизайн сайтов»', time: '5 минут назад', unread: true },
    { id: 2, text: 'Никита Евреев оставил отзыв о вашей работе', time: '2 часа назад', unread: true },
    { id: 3, text: 'Оплата за «Дизайн логотипа» зачислена', time: 'вчера', unread: false },
  ],
  [ROLES.client]: [
    { id: 1, text: 'На ваш заказ пришло 3 новых предложения', time: '12 минут назад', unread: true },
    { id: 2, text: 'Исполнитель сдал работу «Дизайн сайта»', time: '3 часа назад', unread: false },
  ],
}

const iconButtonClassName =
  'relative flex size-10 items-center justify-center rounded-full text-lilac transition-[color,background-color,scale] duration-200 hover:bg-lavender hover:text-primary active:scale-90'

function Badge({ children }) {
  return (
    <span className="absolute -top-0.5 -right-0.5 flex h-4.5 min-w-4.5 animate-pop items-center justify-center rounded-full bg-accent px-1 text-[10px] leading-none font-bold text-white ring-2 ring-white">
      {children}
    </span>
  )
}

function NotificationsMenu({ role }) {
  const [isOpen, setIsOpen] = useState(false)
  const [items, setItems] = useState(() => NOTIFICATIONS[role] ?? [])
  const ref = useRef(null)
  const close = useCallback(() => setIsOpen(false), [])
  useClickOutside(ref, close, isOpen)
  useEscapeKey(close, isOpen)

  const unreadCount = items.filter((item) => item.unread).length

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-label={`Уведомления${unreadCount ? `, непрочитанных: ${unreadCount}` : ''}`}
        className={iconButtonClassName}
      >
        <BellIcon className="size-6" />
        {unreadCount > 0 && <Badge>{unreadCount}</Badge>}
      </button>

      <div
        className={cn(
          'absolute right-0 z-40 mt-3 w-80 origin-top-right rounded-2xl bg-white p-2 shadow-card transition-[opacity,scale] duration-200 ease-out-expo',
          isOpen ? 'scale-100 opacity-100' : 'pointer-events-none scale-95 opacity-0',
        )}
      >
        <div className="flex items-center justify-between px-3 py-2">
          <p className="text-sm font-semibold">Уведомления</p>
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={() => setItems((list) => list.map((item) => ({ ...item, unread: false })))}
              className="text-xs font-medium text-primary hover:underline"
            >
              Прочитать все
            </button>
          )}
        </div>
        <ul>
          {items.map((item) => (
            <li key={item.id} className="flex gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-surface">
              <span
                className={cn('mt-1.5 size-2 shrink-0 rounded-full', item.unread ? 'bg-primary' : 'bg-transparent')}
              />
              <div>
                <p className="text-sm leading-snug">{item.text}</p>
                <p className="mt-1 text-[11px] text-muted">{item.time}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/** Иконки избранного, уведомлений и сообщений в шапке авторизованного пользователя */
export function HeaderActions() {
  const { user } = useAuth()
  const { count } = useFavorites()

  return (
    <div className="hidden items-center gap-1 sm:flex md:gap-2">
      <Link to={ROUTES.favorites} className={iconButtonClassName} aria-label={`Избранные ворки: ${count}`}>
        <StarIcon className="size-6" />
        {count > 0 && <Badge key={count}>{count > 99 ? '99+' : count}</Badge>}
      </Link>
      <NotificationsMenu role={user.role} />
      <Link to={ROUTES.chat} className={iconButtonClassName} aria-label="Сообщения">
        <ChatIcon className="size-6" />
      </Link>
    </div>
  )
}
