import { StarIcon } from '@/components/icons'
import { cn } from '@/lib/cn'

const STAR_SIZES = {
  xs: 'size-4',
  sm: 'size-5',
  md: 'size-5 md:size-6',
  lg: 'size-6',
}

const ANIMATIONS = {
  // сразу после монтирования
  mount: 'animate-pop',
  // когда родительский <Reveal> появился в зоне видимости
  reveal: 'opacity-0 group-data-[inview=true]/reveal:animate-pop',
}

/**
 * Звёздный рейтинг с поддержкой дробных значений (4.5 → половина звезды).
 * animate: 'mount' | 'reveal' — звёзды появляются по очереди, начиная через delay мс.
 */
export function Rating({ value, max = 5, size = 'md', animate, delay = 0, className }) {
  const starSize = STAR_SIZES[size]

  return (
    <div className={cn('flex items-center gap-0.5', className)} role="img" aria-label={`Рейтинг ${value} из ${max}`}>
      {Array.from({ length: max }, (_, i) => {
        const fill = Math.min(Math.max(value - i, 0), 1) * 100
        return (
          <span
            key={i}
            className={cn('relative', starSize, animate && ANIMATIONS[animate])}
            style={animate ? { animationDelay: `${delay + i * 90}ms` } : undefined}
          >
            <StarIcon className={cn('absolute inset-0 text-lilac', starSize)} />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill}%` }}>
              <StarIcon className={cn('text-accent', starSize)} />
            </span>
          </span>
        )
      })}
    </div>
  )
}
