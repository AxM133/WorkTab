import { useMemo } from 'react'
import { SaleActions } from '@/components/account/DealActions'
import { DealsList } from '@/components/account/DealsList'
import { DealCard } from '@/components/cards/DealCard'
import { BriefcaseIcon } from '@/components/icons'
import { Button, Container, PageHeading } from '@/components/ui'
import { ROUTES } from '@/constants/routes'
import { useAuth } from '@/hooks/useAuth'
import { getSales } from '@/services/dataService'

/** История выполненных работ фрилансера */
export function CompletedWorksPage() {
  const { user } = useAuth()
  const sales = useMemo(() => getSales(user.id), [user.id])

  return (
    <Container className="py-10 md:py-14">
      <PageHeading>
        Выполненные <span className="text-accent">работы</span>
      </PageHeading>

      <DealsList
        deals={sales}
        countForms={['работа', 'работы', 'работ']}
        empty={{
          icon: BriefcaseIcon,
          title: 'Выполненных работ пока нет',
          text: 'Когда заказчики начнут покупать ваши ворки, история сделок появится здесь',
          action: <Button to={ROUTES.exchange}>Найти заказы на бирже</Button>,
        }}
        renderCard={(sale) => (
          <DealCard deal={sale} personLabel="Заказчик" person={sale.customer} actions={<SaleActions sale={sale} />} />
        )}
      />
    </Container>
  )
}
