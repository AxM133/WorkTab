import { cn } from '@/lib/cn'

/** Центрированная обёртка контента: 1320px + боковые отступы */
export function Container({ as: Tag = 'div', className, children }) {
  return <Tag className={cn('mx-auto w-full max-w-[1352px] px-4 sm:px-6 lg:px-4', className)}>{children}</Tag>
}
