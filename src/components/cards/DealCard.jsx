import { Link } from 'react-router-dom'
import { Avatar } from '@/components/ui'
import { DEAL_STATUS } from '@/constants/deals'
import { ROUTES } from '@/constants/routes'
import { cn } from '@/lib/cn'
import { formatDate, formatPrice } from '@/lib/format'

/**
 * Карточка сделки: купленный ворк (у заказчика) или выполненная работа (у фрилансера).
 * person — вторая сторона сделки { name, avatar, to? }, actions — кнопки внизу.
 */
export function DealCard({ deal, person, personLabel, actions }) {
  const status = DEAL_STATUS[deal.status]

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition-[translate,box-shadow,border-color] duration-300 ease-out-expo hover:-translate-y-1.5 hover:border-transparent hover:shadow-card">
      <Link
        to={ROUTES.work(deal.work.id)}
        className="relative block aspect-[16/9] overflow-hidden bg-lavender"
        tabIndex={-1}
      >
        <img
          src={deal.work.cover}
          alt=""
          loading="lazy"
          className="size-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
        />
        <span
          className={cn(
            'absolute top-3 left-3 rounded-full px-3 py-1 text-[11px] font-semibold text-white shadow-soft',
            status.badgeClassName,
          )}
        >
          {status.label}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-4 md:px-5">
        <h3 className="line-clamp-2 text-sm font-semibold">
          <Link to={ROUTES.work(deal.work.id)} className="transition-colors hover:text-primary">
            {deal.work.title}
          </Link>
        </h3>
        <p className="mt-2 text-sm font-semibold text-primary">{formatPrice(deal.price)}</p>

        <div className="mt-4 flex items-center gap-3">
          <Avatar src={person.avatar} name={person.name} size={36} />
          <div className="min-w-0 text-xs">
            <p className="text-[11px] text-muted">{personLabel}</p>
            {person.to ? (
              <Link to={person.to} className="block truncate font-medium transition-colors hover:text-primary">
                {person.name}
              </Link>
            ) : (
              <p className="truncate font-medium">{person.name}</p>
            )}
          </div>
        </div>

        <p className="mt-3 text-[11px] text-muted">{formatDate(deal.date)}</p>

        {actions && <div className="mt-auto flex flex-wrap gap-2 pt-4">{actions}</div>}
      </div>
    </article>
  )
}
