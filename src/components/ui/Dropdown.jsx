import { useCallback, useRef, useState } from 'react'
import { CheckIcon, ChevronDownIcon } from '@/components/icons'
import { useClickOutside } from '@/hooks/useClickOutside'
import { useEscapeKey } from '@/hooks/useEscapeKey'
import { cn } from '@/lib/cn'

/** Выпадающий список-пилюля (сортировка и т.п.) */
export function Dropdown({ value, options, onChange, label = 'Сортировка', className }) {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef(null)
  const close = useCallback(() => setIsOpen(false), [])
  useClickOutside(ref, close, isOpen)
  useEscapeKey(close, isOpen)

  const current = options.find((option) => option.value === value)

  return (
    <div ref={ref} className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`${label}: ${current?.label}`}
        className="flex h-10 items-center gap-2 rounded-full border border-line bg-white px-5 text-sm font-medium transition-[border-color,box-shadow] hover:border-lavender-dark hover:shadow-soft"
      >
        {current?.label}
        <ChevronDownIcon className={cn('size-4 transition-transform duration-300', isOpen && 'rotate-180')} />
      </button>

      <ul
        role="listbox"
        className={cn(
          'absolute right-0 z-20 mt-2 min-w-full origin-top-right rounded-2xl bg-white p-2 shadow-card transition-[opacity,scale] duration-200 ease-out-expo',
          isOpen ? 'scale-100 opacity-100' : 'pointer-events-none scale-95 opacity-0',
        )}
      >
        {options.map((option) => {
          const isSelected = option.value === value
          return (
            <li key={option.value} role="option" aria-selected={isSelected}>
              <button
                type="button"
                tabIndex={isOpen ? 0 : -1}
                onClick={() => {
                  onChange(option.value)
                  close()
                }}
                className={cn(
                  'flex w-full items-center justify-between gap-4 rounded-xl px-4 py-2.5 text-left text-sm whitespace-nowrap transition-colors hover:bg-lavender',
                  isSelected && 'font-semibold text-primary',
                )}
              >
                {option.label}
                {isSelected && <CheckIcon className="size-4" />}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
