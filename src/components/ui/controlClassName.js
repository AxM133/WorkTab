import { cn } from '@/lib/cn'

/** Общие классы текстовых полей (input, select, textarea, TagInput) */
export const controlClassName = (error) =>
  cn(
    'w-full rounded-xl border bg-white px-4 text-sm text-ink outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-muted',
    'focus:border-primary focus:ring-4 focus:ring-primary/10 disabled:bg-surface disabled:text-muted',
    error ? 'border-danger' : 'border-line hover:border-lavender-dark',
  )
