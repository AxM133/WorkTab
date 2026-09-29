import { useCallback, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ChevronDownIcon, LogoutIcon } from '@/components/icons'
import { Avatar } from '@/components/ui'
import { getAccountLinks } from '@/constants/navigation'
import { ROLE_LABELS } from '@/constants/profile'
import { useAuth } from '@/hooks/useAuth'
import { useClickOutside } from '@/hooks/useClickOutside'
import { useEscapeKey } from '@/hooks/useEscapeKey'
import { cn } from '@/lib/cn'
import { getFullName } from '@/lib/format'

/** Имя, аватар и выпадающее меню профиля в шапке */
export function UserMenu() {
  const { user, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef(null)
  const close = useCallback(() => setIsOpen(false), [])
  useClickOutside(ref, close, isOpen)
  useEscapeKey(close, isOpen)

  const fullName = getFullName(user)

  // с защищённой страницы ProtectedRoute сам уведёт на главную, с публичной — остаёмся на месте
  const handleLogout = () => {
    close()
    logout()
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label="Меню профиля"
        className="flex items-center gap-3 rounded-full py-1 pr-1 pl-1 transition-colors hover:bg-lavender/70 sm:pr-2 xl:pl-4"
      >
        <span className="hidden text-sm font-medium xl:block">{fullName}</span>
        <Avatar src={user.avatar} name={fullName} size={48} className="md:size-14!" />
        <ChevronDownIcon
          className={cn('hidden size-5 transition-transform duration-300 sm:block', isOpen && 'rotate-180')}
        />
      </button>

      <div
        role="menu"
        className={cn(
          'absolute right-0 z-40 mt-3 w-72 origin-top-right rounded-2xl bg-white p-2 shadow-card transition-[opacity,scale,translate] duration-200 ease-out-expo',
          isOpen ? 'translate-y-0 scale-100 opacity-100' : 'pointer-events-none -translate-y-1 scale-95 opacity-0',
        )}
      >
        <div className="flex items-center gap-3 rounded-xl bg-surface p-3">
          <Avatar src={user.avatar} name={fullName} size={44} />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{fullName}</p>
            <p className="text-xs text-accent">{user.profile?.specialization ?? ROLE_LABELS[user.role]}</p>
          </div>
        </div>

        <ul className="mt-2 flex flex-col">
          {getAccountLinks(user.role).map(({ label, to, icon: Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                end
                role="menuitem"
                tabIndex={isOpen ? 0 : -1}
                onClick={close}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors hover:bg-lavender',
                    isActive && 'font-semibold text-primary',
                  )
                }
              >
                <Icon className="size-5 text-lilac" />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="mt-1 border-t border-line pt-1">
          <button
            type="button"
            role="menuitem"
            tabIndex={isOpen ? 0 : -1}
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-danger transition-colors hover:bg-danger/10"
          >
            <LogoutIcon className="size-5" />
            Выйти
          </button>
        </div>
      </div>
    </div>
  )
}
