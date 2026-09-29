import { useMemo, useState } from 'react'
import { EmptyState, LoadMore, Reveal } from '@/components/ui'
import { sortItems } from '@/constants/deals'
import { useLoadMore } from '@/hooks/useLoadMore'
import { plural } from '@/lib/format'
import { ListToolbar } from './ListToolbar'

/**
 * Сетка сделок с фильтром по статусу, сортировкой и «Загрузить еще».
 * countForms — склонения для «Всего N …», renderCard — как отрисовать одну сделку.
 */
export function DealsList({ deals, countForms, renderCard, empty }) {
  const [status, setStatus] = useState(null)
  const [sort, setSort] = useState('price-asc')

  const filtered = useMemo(
    () => sortItems(status ? deals.filter((deal) => deal.status === status) : deals, sort),
    [deals, status, sort],
  )
  const { visible, hasMore, loadMore } = useLoadMore(filtered, { initial: 12, step: 8, resetKey: `${status}-${sort}` })

  if (!deals.length) return <EmptyState {...empty} className="mt-12" />

  return (
    <>
      <ListToolbar
        summary={`Всего ${plural(filtered.length, countForms)}`}
        status={status}
        onStatusChange={setStatus}
        sort={sort}
        onSortChange={setSort}
      />

      {filtered.length === 0 ? (
        <p className="animate-fade-up py-16 text-center text-sm text-muted">Нет сделок с таким статусом</p>
      ) : (
        <ul key={`${status}-${sort}`} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((deal, index) => (
            <Reveal as="li" key={deal.id} delay={(index % 4) * 70}>
              {renderCard(deal)}
            </Reveal>
          ))}
        </ul>
      )}

      <LoadMore hasMore={hasMore} onClick={loadMore} />
    </>
  )
}
