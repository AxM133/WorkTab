import { useId, useState } from 'react'
import { ChevronDownIcon, EyeIcon, EyeOffIcon } from '@/components/icons'
import { cn } from '@/lib/cn'
import { controlClassName } from './controlClassName'

/** Обёртка поля формы: подпись, само поле, ошибка или подсказка */
export function Field({ label, htmlFor, error, hint, required, className, children }) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {label && (
        <label htmlFor={htmlFor} className="text-sm font-medium">
          {label}
          {required && <span className="text-accent"> *</span>}
        </label>
      )}
      {children}
      {error ? (
        <p className="animate-fade-up text-xs text-danger [animation-duration:.3s]" role="alert">
          {error}
        </p>
      ) : (
        hint && <p className="text-xs text-muted">{hint}</p>
      )}
    </div>
  )
}

export function Input({ label, error, hint, required, id, type = 'text', className, ...props }) {
  const autoId = useId()
  const inputId = id ?? autoId
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const isPassword = type === 'password'

  return (
    <Field label={label} htmlFor={inputId} error={error} hint={hint} required={required} className={className}>
      <div className="relative">
        <input
          id={inputId}
          type={isPassword && isPasswordVisible ? 'text' : type}
          aria-invalid={Boolean(error)}
          className={cn(controlClassName(error), 'h-12', isPassword && 'pr-12')}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setIsPasswordVisible((visible) => !visible)}
            className="absolute top-1/2 right-3 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-muted transition-colors hover:bg-lavender hover:text-ink"
            aria-label={isPasswordVisible ? 'Скрыть пароль' : 'Показать пароль'}
          >
            {isPasswordVisible ? <EyeOffIcon className="size-5" /> : <EyeIcon className="size-5" />}
          </button>
        )}
      </div>
    </Field>
  )
}

export function Textarea({ label, error, hint, required, id, className, value = '', maxLength, ...props }) {
  const autoId = useId()
  const inputId = id ?? autoId

  return (
    <Field label={label} htmlFor={inputId} error={error} hint={hint} required={required} className={className}>
      <div className="relative">
        <textarea
          id={inputId}
          value={value}
          maxLength={maxLength}
          aria-invalid={Boolean(error)}
          className={cn(controlClassName(error), 'min-h-36 resize-y py-3 leading-relaxed')}
          {...props}
        />
        {maxLength && (
          <span className="pointer-events-none absolute right-3 bottom-2 text-[11px] text-muted">
            {value.length}/{maxLength}
          </span>
        )}
      </div>
    </Field>
  )
}

export function Select({ label, error, hint, required, id, className, options, placeholder, ...props }) {
  const autoId = useId()
  const inputId = id ?? autoId

  return (
    <Field label={label} htmlFor={inputId} error={error} hint={hint} required={required} className={className}>
      <div className="relative">
        <select
          id={inputId}
          aria-invalid={Boolean(error)}
          className={cn(controlClassName(error), 'h-12 cursor-pointer appearance-none pr-11')}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => {
            const { value, label: optionLabel } = typeof option === 'string' ? { value: option, label: option } : option
            return (
              <option key={value} value={value}>
                {optionLabel}
              </option>
            )
          })}
        </select>
        <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-muted" />
      </div>
    </Field>
  )
}
