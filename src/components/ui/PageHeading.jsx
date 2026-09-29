import { cn } from '@/lib/cn'

/** Заголовок страницы ЛК по центру. Выделенное слово передаётся через <span className="text-accent"> */
export function PageHeading({ children, className }) {
  return (
    <h1 className={cn('animate-fade-up text-center text-2xl font-semibold md:text-[32px]', className)}>{children}</h1>
  )
}
