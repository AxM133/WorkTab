import { CheckIcon } from '@/components/icons'
import { cn } from '@/lib/cn'

export function Checkbox({ label, error, className, ...props }) {
  return (
    <div className={className}>
      <label className="group flex cursor-pointer items-start gap-3 text-sm select-none">
        <input type="checkbox" className="peer sr-only" {...props} />
        <span
          className={cn(
            'mt-px flex size-5 shrink-0 items-center justify-center rounded-md border-2 bg-white text-white transition-[background-color,border-color,box-shadow] duration-200',
            'peer-checked:border-primary peer-checked:bg-primary peer-focus-visible:ring-4 peer-focus-visible:ring-primary/20',
            'group-hover:border-primary [&>svg]:scale-0 [&>svg]:transition-transform peer-checked:[&>svg]:scale-100',
            error ? 'border-danger' : 'border-lavender-dark',
          )}
        >
          <CheckIcon className="size-3.5" />
        </span>
        <span className="leading-snug">{label}</span>
      </label>
      {error && (
        <p className="mt-2 text-xs text-danger" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

/** Круглый переключатель. Повторный клик по выбранному пункту снимает выбор */
export function RadioToggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="group flex items-center gap-2 text-sm font-medium"
    >
      <span
        className={cn(
          'flex size-5 items-center justify-center rounded-full border-2 transition-colors duration-200',
          checked ? 'border-primary' : 'border-lilac group-hover:border-primary',
        )}
      >
        <span
          className={cn(
            'size-2.5 rounded-full bg-primary transition-transform duration-200 ease-spring',
            checked ? 'scale-100' : 'scale-0',
          )}
        />
      </span>
      {label}
    </button>
  )
}
