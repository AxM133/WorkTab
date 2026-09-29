import { useMemo, useState } from 'react'
import { ListToolbar } from '@/components/account/ListToolbar'
import { OrderCard } from '@/components/cards/OrderCard'
import { ListIcon } from '@/components/icons'
import { Button, Container, EmptyState, LoadMore, PageHeading, Reveal } from '@/components/ui'
import { sortItems } from '@/constants/deals'
import { ROUTES } from '@/constants/routes'
import { useAuth } from '@/hooks/useAuth'
import { useLoadMore } from '@/hooks/useLoadMore'
import { plural } from '@/lib/format'
import { getOrders } from '@/services/dataService'

/** Заказы, опубликованные пользователем на бирже */
export function MyOrdersPage() {
  const { user } = useAuth()
  const orders = useMemo(() => getOrders(user.id), [user.id])
  const [sort, setSort] = useState('price-asc')

  const sorted = useMemo(() => sortItems(orders, sort, { getPrice: (order) => order.budget }), [orders, sort])
  const { visible, hasMore, loadMore } = useLoadMore(sorted, { initial: 6, step: 6, resetKey: sort })

  return (
    <Container className="max-w-[1160px] py-10 md:py-14">
      <PageHeading>
        Мои <span className="text-accent">заказы</span>
      </PageHeading>

      {orders.length === 0 ? (
        <EmptyState
          icon={ListIcon}
          title="Вы ещё не публиковали заказы"
          text="Опишите задачу — фрилансеры сами предложат свои услуги и цены"
          action={<Button to={ROUTES.createOrder}>Создать заказ</Button>}
          className="mt-12"
        />
      ) : (
        <>
          <ListToolbar
            summary={`Всего ${plural(orders.length, ['заявка', 'заявки', 'заявок'])}`}
            sort={sort}
            onSortChange={setSort}
          />
          <ul key={sort} className="flex flex-col gap-5">
            {visible.map((order) => (
              <Reveal as="li" key={order.id}>
                <OrderCard order={order} />
              </Reveal>
            ))}
          </ul>
          <LoadMore hasMore={hasMore} onClick={loadMore} />
        </>
      )}
    </Container>
  )
}
