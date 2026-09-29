import { NavLink } from 'react-router-dom'
import { CloseIcon, LogoutIcon } from '@/components/icons'
import { Avatar, Button } from '@/components/ui'
import { getAccountLinks, MAIN_NAV, USER_NAV } from '@/constants/navigation'
import { ROLE_LABELS } from '@/constants/profile'
import { ROUTES } from '@/constants/routes'
import { useAuth } from '@/hooks/useAuth'
import { useEscapeKey } from '@/hooks/useEscapeKey'
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll'
import { cn } from '@/lib/cn'
import { getFullName } from '@/lib/format'
import { Logo } from './Logo'

const linkClassName = ({ isActive }) =>
  cn(
    'flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium transition-colors hover:bg-lavender',
    isActive && 'bg-lavender text-primary',
  )

export function MobileMenu({ isOpen, onClose }) {
  const { user, logout } = useAuth()
  useLockBodyScroll(isOpen)
  useEscapeKey(onClose, isOpen)

  const nav = user ? USER_NAV : MAIN_NAV
  const itemClassName = cn(
    'transition-[opacity,translate] duration-500 ease-out-expo',
    isOpen ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0',
  )
  const itemStyle = (index) => ({ transitionDelay: isOpen ? `${150 + index * 50}ms` : '0ms' })

  const handleLogout = () => {
    onClose()
    logout()
  }

  return (
    <div className={cn('fixed inset-0 z-50 lg:hidden', !isOpen && 'pointer-events-none')} aria-hidden={!isOpen}>
      <div
        className={cn(
          'absolute inset-0 bg-ink/50 transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0',
        )}
        onClick={onClose}
      />

      <aside
        className={cn(
          'absolute top-0 right-0 flex h-full w-full max-w-sm flex-col overflow-y-auto bg-white p-6 shadow-card transition-transform duration-500 ease-out-expo',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
        aria-label="Мобильное меню"
      >
        <div className="flex items-center justify-between">
          <Logo />
          <button
            type="button"
            onClick={onClose}
            className="flex size-10 items-center justify-center rounded-full hover:bg-lavender"
            aria-label="Закрыть меню"
          >
            <CloseIcon className="size-6" />
          </button>
        </div>

        {user && (
          <NavLink
            to={ROUTES.account}
            onClick={onClose}
            className="mt-8 flex items-center gap-3 rounded-2xl bg-surface p-4 transition-colors hover:bg-lavender"
          >
            <Avatar src={user.avatar} name={getFullName(user)} size={48} />
            <span className="min-w-0">
              <span className="block truncate font-semibold">{getFullName(user)}</span>
              <span className="block text-xs text-accent">
                {user.profile?.specialization ?? ROLE_LABELS[user.role]}
              </span>
            </span>
          </NavLink>
        )}

        <nav className="mt-6" aria-label="Основная навигация">
          <ul className="flex flex-col gap-1">
            {nav.map((item, index) => (
              <li key={item.to} className={itemClassName} style={itemStyle(index)}>
                <NavLink to={item.to} onClick={onClose} className={linkClassName}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {user && (
          <ul className="mt-4 flex flex-col gap-1 border-t border-line pt-4">
            {getAccountLinks(user.role).map(({ label, to, icon: Icon }, index) => (
              <li key={to} className={itemClassName} style={itemStyle(nav.length + index)}>
                <NavLink to={to} end onClick={onClose} className={linkClassName}>
                  <Icon className="size-5 text-lilac" />
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto flex flex-col gap-3 pt-8">
          {user ? (
            <Button variant="soft" fullWidth onClick={handleLogout} className="text-danger! hover:bg-danger/10">
              <LogoutIcon className="size-5" />
              Выйти
            </Button>
          ) : (
            <>
              <Button to={ROUTES.login} fullWidth onClick={onClose}>
                Войти
              </Button>
              <Button to={ROUTES.register} variant="secondary" fullWidth onClick={onClose}>
                Регистрация
              </Button>
            </>
          )}
        </div>
      </aside>
    </div>
  )
}
