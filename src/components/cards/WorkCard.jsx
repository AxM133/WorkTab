import { Link } from 'react-router-dom'
import { Avatar, Rating } from '@/components/ui'
import { ROUTES } from '@/constants/routes'
import { cn } from '@/lib/cn'
import { formatPrice, getFullName } from '@/lib/format'
import { FavoriteButton } from './FavoriteButton'

/**
 * Карточка ворка: обложка — название — цена, опционально продавец и рейтинг.
 * work.author нужен только при showSeller.
 */
export function WorkCard({ work, showSeller = false, showFavorite = false, className }) {
  const authorName = work.author && getFullName(work.author)

  return (
    <article
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition-[translate,box-shadow,border-color] duration-300 ease-out-expo hover:-translate-y-1.5 hover:border-transparent hover:shadow-card',
        className,
      )}
    >
      <Link to={ROUTES.work(work.id)} className="block aspect-[16/9] overflow-hidden bg-lavender" tabIndex={-1}>
        <img
          src={work.cover}
          alt=""
          loading="lazy"
          className="size-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
        />
      </Link>

      {showFavorite && <FavoriteButton workId={work.id} className="absolute top-3 right-3" />}

      <div className="flex flex-1 flex-col p-4 md:px-5">
        <h3 className="line-clamp-2 text-sm font-semibold">
          <Link to={ROUTES.work(work.id)} className="transition-colors hover:text-primary">
            {work.title}
          </Link>
        </h3>
        <p className="mt-3 text-sm font-semibold text-primary">{formatPrice(work.price)}</p>

        {showSeller && work.author && (
          <>
            <Link to={ROUTES.profile(work.author.id)} className="mt-4 flex items-center gap-3">
              <Avatar src={work.author.avatar} name={authorName} size={40} />
              <span className="min-w-0">
                <span className="block truncate text-xs font-medium transition-colors hover:text-primary">
                  {authorName}
                </span>
                <span className="block text-[11px] text-muted">
                  Выполнено проектов: {work.author.completedProjects}
                </span>
              </span>
            </Link>
            <Rating value={work.rating} size="sm" className="mt-3" />
          </>
        )}
      </div>
    </article>
  )
}
