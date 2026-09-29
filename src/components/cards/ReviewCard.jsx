import { Avatar, Rating } from '@/components/ui'
import { formatDate } from '@/lib/format'

/** Карточка отзыва: аватар — имя — рейтинг — текст — дата */
export function ReviewCard({ review }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-line bg-white p-5 transition-[translate,box-shadow,border-color] duration-300 ease-out-expo hover:-translate-y-1 hover:border-transparent hover:shadow-card">
      <header className="flex items-center gap-4">
        <Avatar src={review.author.avatar} name={review.author.name} size={52} />
        <div>
          <h3 className="text-sm font-semibold">{review.author.name}</h3>
          <Rating value={review.rating} size="sm" className="mt-2" />
        </div>
      </header>
      <p className="mt-4 flex-1 text-xs leading-relaxed text-body">{review.text}</p>
      <p className="mt-4 text-[11px] text-muted">{formatDate(review.date)}</p>
    </article>
  )
}
