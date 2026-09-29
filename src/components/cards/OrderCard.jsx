import { Link } from 'react-router-dom'
import { ORDER_STATUS } from '@/constants/deals'
import { ROUTES } from '@/constants/routes'
import { cn } from '@/lib/cn'
import { formatPrice, formatTimeAgo } from '@/lib/format'

/** Карточка заказа: заголовок и бюджет — описание — статус и число предложений */
export function OrderCard({ order }) {
  const status = ORDER_STATUS[order.status]

  return (
    <article className="group relative rounded-2xl border border-line bg-white p-5 transition-[translate,box-shadow,border-color] duration-300 ease-out-expo hover:-translate-y-1 hover:border-transparent hover:shadow-card md:px-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between md:gap-8">
        <h3 className="text-base font-semibold md:text-lg">
          {/* растянутая ссылка: вся карточка кликабельна */}
          <Link
            to={ROUTES.order(order.id)}
            className="transition-colors group-hover:text-primary after:absolute after:inset-0 after:rounded-2xl"
          >
            {order.title}
          </Link>
        </h3>
        <div className="shrink-0 md:text-right">
          <p className="text-base font-semibold text-primary md:text-lg">Бюджет: {formatPrice(order.budget)}</p>
          <p className="mt-1 text-[11px] text-muted">{formatTimeAgo(order.date)}</p>
        </div>
      </div>

      <p className="mt-4 line-clamp-3 max-w-3xl text-sm leading-relaxed text-body">{order.description}</p>

      <div className="mt-5 flex items-center justify-between text-sm">
        <span className={cn('font-semibold', status.className)}>{status.label}</span>
        <span className="text-muted">Предложений: {order.proposals}</span>
      </div>
    </article>
  )
}
