import { Link } from 'react-router-dom'
import { ArrowRightIcon } from '@/components/icons'
import { cn } from '@/lib/cn'

/** Светло-фиолетовая плашка-ссылка в конце сетки карточек («Смотреть все …») */
export function ViewAllCard({ to, label, className }) {
  return (
    <Link
      to={to}
      className={cn(
        'group/all relative flex min-h-40 flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl bg-lavender p-6 text-center text-sm font-semibold text-primary transition-[background-color,translate,box-shadow] duration-300 hover:-translate-y-1.5 hover:bg-lavender-dark hover:shadow-card md:text-base',
        className,
      )}
    >
      {/* декоративные круги, «наплывающие» при наведении */}
      <span className="absolute -top-10 -right-10 size-32 rounded-full bg-white/50 transition-transform duration-700 ease-out-expo group-hover/all:scale-150" />
      <span className="absolute -bottom-12 -left-8 size-28 rounded-full bg-white/40 transition-transform duration-700 ease-out-expo group-hover/all:scale-150" />

      <span className="relative">{label}</span>
      <span className="relative flex size-10 items-center justify-center rounded-full bg-white text-primary shadow-soft transition-[background-color,color,translate] duration-300 group-hover/all:translate-x-1.5 group-hover/all:bg-primary group-hover/all:text-white">
        <ArrowRightIcon className="size-5" />
      </span>
    </Link>
  )
}
