import { Link } from 'react-router-dom'
import { ChevronRightIcon } from '@/components/icons'
import { ROUTES } from '@/constants/routes'

/**
 * Оранжевая вкладка «Быстрый поиск ворков», прижатая к левому краю экрана.
 * На широких экранах раскрыта, на остальных десктопах раскрывается при наведении.
 */
export function QuickSearchTab() {
  return (
    <Link
      to={ROUTES.search}
      className="group fixed top-[38%] left-0 z-20 hidden animate-[fade-up_.8s_var(--ease-out-expo)_.6s_both] items-center gap-2 rounded-r-full bg-accent py-3.5 pr-2.5 pl-3 text-white shadow-glow-accent transition-[padding,background-color] duration-300 hover:bg-accent-dark hover:pl-5 lg:flex 2xl:pl-5"
    >
      <span className="max-w-0 overflow-hidden text-xs leading-tight font-semibold whitespace-nowrap transition-[max-width] duration-500 ease-out-expo group-hover:max-w-32 2xl:max-w-32">
        Быстрый
        <br />
        поиск ворков
      </span>
      <ChevronRightIcon className="size-5 transition-transform group-hover:translate-x-0.5" />
    </Link>
  )
}
