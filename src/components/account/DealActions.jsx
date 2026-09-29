import { Button, Rating } from '@/components/ui'
import { ROUTES } from '@/constants/routes'

/** Кнопки на карточке покупки (ЛК заказчика) */
export function PurchaseActions({ purchase }) {
  if (purchase.status === 'in_progress') {
    return (
      <Button to={ROUTES.chat} variant="outline" size="sm" fullWidth>
        Написать продавцу
      </Button>
    )
  }

  return (
    <>
      <Button to={`${ROUTES.work(purchase.work.id)}#reviews`} size="sm" className="flex-1 px-3">
        Оставить отзыв
      </Button>
      <Button to={ROUTES.work(purchase.work.id)} variant="soft" size="sm" className="flex-1 px-3">
        Повторить
      </Button>
    </>
  )
}

/** Низ карточки выполненной работы (ЛК фрилансера): оценка заказчика или кнопка связи */
export function SaleActions({ sale }) {
  if (sale.status === 'in_progress') {
    return (
      <Button to={ROUTES.chat} variant="outline" size="sm" fullWidth>
        Написать заказчику
      </Button>
    )
  }

  return sale.rating ? (
    <div className="flex items-center gap-2 text-xs text-muted">
      <Rating value={sale.rating} size="xs" />
      оценка заказчика
    </div>
  ) : (
    <span className="text-xs text-muted">Ожидает отзыва</span>
  )
}
