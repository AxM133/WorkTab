import { Button } from './Button'

/** Кнопка «Загрузить еще» под списками */
export function LoadMore({ hasMore, onClick, label = 'Загрузить еще' }) {
  if (!hasMore) return null
  return (
    <div className="mt-10 flex justify-center">
      <Button variant="outline" onClick={onClick} className="h-12 px-12">
        {label}
      </Button>
    </div>
  )
}
