import { cn } from '@/lib/cn'
import { Reveal } from './Reveal'

export function SectionHeader({ title, subtitle, action, className, titleClassName }) {
  return (
    <Reveal className={cn('mb-8 flex flex-wrap items-end justify-between gap-4 md:mb-10', className)}>
      <div>
        <h2 className={cn('text-xl font-bold md:text-2xl', titleClassName)}>{title}</h2>
        {subtitle && <p className="mt-3 text-sm text-body">{subtitle}</p>}
      </div>
      {action}
    </Reveal>
  )
}
