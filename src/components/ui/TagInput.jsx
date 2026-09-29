import { useId, useState } from 'react'
import { CloseIcon, PlusIcon } from '@/components/icons'
import { cn } from '@/lib/cn'
import { controlClassName } from './controlClassName'
import { Field } from './Field'

/**
 * Поле для списка тегов (навыки, языки): Enter или запятая — добавить, Backspace в пустом поле — удалить последний.
 * suggestions — подсказки, которые можно добавить кликом.
 */
export function TagInput({ label, value, onChange, suggestions = [], placeholder, error, hint, required, max = 15 }) {
  const id = useId()
  const [draft, setDraft] = useState('')
  const isFull = value.length >= max

  const add = (raw) => {
    const tag = raw.trim()
    if (!tag || isFull) return
    if (!value.some((item) => item.toLowerCase() === tag.toLowerCase())) onChange([...value, tag])
    setDraft('')
  }

  const remove = (tag) => onChange(value.filter((item) => item !== tag))

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault()
      add(draft)
    } else if (event.key === 'Backspace' && !draft && value.length) {
      remove(value[value.length - 1])
    }
  }

  const available = suggestions.filter((item) => !value.includes(item))

  return (
    <Field label={label} htmlFor={id} error={error} hint={hint} required={required}>
      <div
        className={cn(
          controlClassName(error),
          'flex min-h-12 flex-wrap items-center gap-2 px-3 py-2 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10',
        )}
      >
        {value.map((tag) => (
          <span
            key={tag}
            className="flex animate-chip-in items-center gap-1 rounded-full bg-lavender py-1 pr-1.5 pl-3 text-xs font-medium"
          >
            {tag}
            <button
              type="button"
              onClick={() => remove(tag)}
              className="flex size-5 items-center justify-center rounded-full text-muted transition-colors hover:bg-white hover:text-danger"
              aria-label={`Удалить ${tag}`}
            >
              <CloseIcon className="size-3" />
            </button>
          </span>
        ))}
        <input
          id={id}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => add(draft)}
          disabled={isFull}
          placeholder={isFull ? `Максимум ${max}` : placeholder}
          className="h-8 min-w-32 flex-1 bg-transparent text-sm outline-none placeholder:text-muted"
        />
      </div>

      {available.length > 0 && !isFull && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted">Популярные:</span>
          {available.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => add(item)}
              className="flex items-center gap-1 rounded-full border border-dashed border-lavender-dark px-3 py-1 text-xs transition-[color,border-color,background-color] hover:border-primary hover:bg-mint hover:text-primary"
            >
              <PlusIcon className="size-3" />
              {item}
            </button>
          ))}
        </div>
      )}
    </Field>
  )
}
