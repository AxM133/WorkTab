import { cn } from '@/lib/cn'

/** Текстовые вкладки с подчёркиванием активной: tabs = [{ value, label }] */
export function Tabs({ tabs, value, onChange, className }) {
  return (
    <div role="tablist" className={cn('flex flex-wrap gap-x-8 gap-y-2', className)}>
      {tabs.map((tab) => {
        const isActive = tab.value === value
        return (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.value)}
            className={cn(
              'relative py-1.5 text-sm transition-colors',
              'after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-left after:rounded-full after:bg-primary after:transition-transform after:duration-300',
              isActive ? 'font-semibold text-primary after:scale-x-100' : 'text-ink after:scale-x-0 hover:text-primary',
            )}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
