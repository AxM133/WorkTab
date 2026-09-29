import { useMemo } from 'react'
import { PurchaseActions } from '@/components/account/DealActions'
import { DealsList } from '@/components/account/DealsList'
import { DealCard } from '@/components/cards/DealCard'
import { BagIcon } from '@/components/icons'
import { Button, Container, PageHeading } from '@/components/ui'
import { ROUTES } from '@/constants/routes'
import { useAuth } from '@/hooks/useAuth'
import { getFullName } from '@/lib/format'
import { getPurchases } from '@/services/dataService'

/** История покупок заказчика */
export function PurchasesPage() {
  const { user } = useAuth()
  const purchases = useMemo(() => getPurchases(user.id), [user.id])

  return (
    <Container className="py-10 md:py-14">
      <PageHeading>
        История <span className="text-accent">покупок</span>
      </PageHeading>

      <DealsList
        deals={purchases}
        countForms={['сделка', 'сделки', 'сделок']}
        empty={{
          icon: BagIcon,
          title: 'Покупок пока нет',
          text: 'Здесь появятся ворки, которые вы купите. Загляните в каталог — там тысячи готовых услуг',
          action: <Button to={ROUTES.works}>Перейти в каталог</Button>,
        }}
        renderCard={(purchase) => (
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
        )}
      />
    </Container>
  )
}
