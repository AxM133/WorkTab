import { getInitials } from '@/lib/format'
import { cn } from '@/lib/cn'

/**
 * Круглый аватар. Без фото показывает инициалы из name.
 * status: 'online' — зелёная точка с пульсацией, 'offline' — сиреневая, не передан — без индикатора
 */
export function Avatar({ src, alt, name = alt, size = 40, status, className, imageClassName }) {
  return (
    <span className={cn('relative inline-block shrink-0', className)} style={{ width: size, height: size }}>
      {src ? (
        <img
          src={src}
          alt={alt ?? name ?? ''}
          loading="lazy"
          className={cn('size-full rounded-full object-cover transition-transform duration-500', imageClassName)}
        />
      ) : (
        <span
          role="img"
          aria-label={name}
          className={cn(
            'flex size-full items-center justify-center rounded-full bg-linear-to-br from-primary to-[#12a4a0] font-semibold text-white transition-transform duration-500',
            imageClassName,
          )}
          style={{ fontSize: Math.max(12, size * 0.36) }}
        >
          {getInitials(name)}
        </span>
      )}
      {status && (
        <span
          className="absolute right-[6%] bottom-[6%] size-[16%] min-h-2.5 min-w-2.5"
          aria-label={status === 'online' ? 'В сети' : 'Не в сети'}
        >
          {status === 'online' && <span className="absolute inset-0 animate-ping rounded-full bg-primary/60" />}
          <span
            className={cn(
              'relative block size-full rounded-full border-2 border-white',
              status === 'online' ? 'bg-primary' : 'bg-lilac',
            )}
          />
        </span>
      )}
    </span>
  )
}
