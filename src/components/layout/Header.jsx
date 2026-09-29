import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { MenuIcon } from '@/components/icons'
import { Button, Container } from '@/components/ui'
import { MAIN_NAV, USER_NAV } from '@/constants/navigation'
import { ROUTES } from '@/constants/routes'
import { useAuth } from '@/hooks/useAuth'
import { useScrolled } from '@/hooks/useScrolled'
import { cn } from '@/lib/cn'
import { HeaderActions } from './HeaderActions'
import { Logo } from './Logo'
import { MobileMenu } from './MobileMenu'
import { UserMenu } from './UserMenu'

export function Header() {
  const { user } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isScrolled = useScrolled()
  const nav = user ? USER_NAV : MAIN_NAV

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-30 transition-[background-color,box-shadow] duration-300',
          isScrolled ? 'bg-white/85 shadow-soft backdrop-blur-md' : 'bg-surface',
        )}
      >
        <Container
          className={cn(
            'flex items-center gap-4 transition-[height] duration-300 md:gap-6',
            isScrolled ? 'h-16 md:h-18' : 'h-18 md:h-24',
          )}
        >
          <Logo />

          <nav className="ml-6 hidden lg:block" aria-label="Основная навигация">
            <ul className="flex items-center gap-8 xl:gap-10">
              {nav.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      cn(
                        'relative py-2 text-sm font-medium transition-colors hover:text-primary',
                        'after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:rounded-full after:bg-primary after:transition-transform after:duration-300 hover:after:scale-x-100',
                        isActive && 'text-primary after:scale-x-100',
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {user ? (
            <div className="ml-auto flex items-center gap-2 md:gap-4">
              <HeaderActions />
              <UserMenu />
            </div>
          ) : (
            <div className="ml-auto hidden items-center gap-4 sm:flex">
              <Button to={ROUTES.register} variant="secondary" size="sm" className="h-10 px-8">
                Регистрация
              </Button>
              <Button to={ROUTES.login} size="sm" className="h-10 px-8">
                Войти
              </Button>
            </div>
          )}

          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            className={cn(
              'flex size-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-lavender lg:hidden',
              !user && 'ml-auto sm:ml-0',
            )}
            aria-label="Открыть меню"
            aria-expanded={isMenuOpen}
          >
            <MenuIcon className="size-6" />
          </button>
        </Container>
      </header>

      {/* вне <header>: backdrop-filter у шапки ломает position: fixed у потомков */}
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  )
}
