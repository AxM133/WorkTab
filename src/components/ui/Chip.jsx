import { cn } from '@/lib/cn'

const variants = {
  ghost: 'border-transparent text-body hover:bg-lavender hover:text-primary',
  accent: 'border-accent text-accent hover:bg-accent hover:text-white',
  primary: 'border-primary text-primary hover:bg-primary hover:text-white',
}

/** Тег-кнопка (рубрики, популярные запросы, фильтры) */
export function Chip({ variant = 'ghost', className, type = 'button', ...props }) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex h-9 items-center gap-1 rounded-full border px-4 text-xs font-medium whitespace-nowrap transition-[color,background-color,translate,scale] duration-200 hover:-translate-y-0.5 active:scale-95 md:text-[13px]',
        variants[variant],
        className,
      )}
      {...props}
    />
  )
}
