import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { PurchaseActions } from '@/components/account/DealActions'
import { DealCard } from '@/components/cards/DealCard'
import { OrderCard } from '@/components/cards/OrderCard'
import { ArrowRightIcon, BagIcon, ListIcon } from '@/components/icons'
import { Button, Container, EmptyState, Reveal, SectionHeader } from '@/components/ui'
import { ROUTES } from '@/constants/routes'
import { getFullName } from '@/lib/format'
import { getOrders, getPurchases } from '@/services/dataService'

function AllLink({ to, children }) {
  return (
    <Link to={to} className="group flex items-center gap-2 text-sm font-semibold text-primary">
      {children}
      <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
    </Link>
  )
}

/** ЛК заказчика: последние покупки и заказы со ссылками на полные списки */
export function ClientActivity({ user }) {
  const purchases = useMemo(() => getPurchases(user.id).sort((a, b) => new Date(b.date) - new Date(a.date)), [user.id])
  const orders = useMemo(() => getOrders(user.id), [user.id])

  return (
    <>
      <section className="pt-16 md:pt-24">
        <Container>
          <SectionHeader
            title="История покупок"
            action={purchases.length > 4 && <AllLink to={ROUTES.purchases}>Вся история</AllLink>}
          />
          {purchases.length === 0 ? (
            <EmptyState
              icon={BagIcon}
              title="Покупок пока нет"
              text="Выберите готовую услугу в каталоге ворков — оплата уходит исполнителю только после приёмки работы"
              action={<Button to={ROUTES.works}>Перейти в каталог</Button>}
            />
          ) : (
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {purchases.slice(0, 4).map((purchase, index) => (
                <Reveal as="li" key={purchase.id} delay={index * 80}>
                  <DealCard
                    deal={purchase}
                    personLabel="Продавец"
                    person={{
                      name: getFullName(purchase.work.author),
                      avatar: purchase.work.author.avatar,
                      to: ROUTES.profile(purchase.work.author.id),
                    }}
                    actions={<PurchaseActions purchase={purchase} />}
                  />
                </Reveal>
              ))}
            </ul>
          )}
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <SectionHeader
            title="Мои заказы"
            action={orders.length > 3 && <AllLink to={ROUTES.myOrders}>Все заказы</AllLink>}
          />
          {orders.length === 0 ? (
            <EmptyState
              icon={ListIcon}
              title="Заказов пока нет"
              text="Опубликуйте задачу — фрилансеры сами предложат свои услуги и цены"
              action={<Button to={ROUTES.createOrder}>Создать заказ</Button>}
            />
          ) : (
            <ul className="flex flex-col gap-5">
              {orders.slice(0, 3).map((order) => (
                <Reveal as="li" key={order.id}>
                  <OrderCard order={order} />
                </Reveal>
              ))}
            </ul>
          )}
        </Container>
      </section>
    </>
  )
}
