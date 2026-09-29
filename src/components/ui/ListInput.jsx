import { PlusIcon, TrashIcon } from '@/components/icons'
import { cn } from '@/lib/cn'
import { controlClassName } from './controlClassName'
import { Field } from './Field'

/** Редактируемый список строк (образование, сертификаты) */
export function ListInput({ label, value, onChange, placeholder, addLabel = 'Добавить', hint, max = 5 }) {
  const update = (index, text) => onChange(value.map((item, i) => (i === index ? text : item)))
  const remove = (index) => onChange(value.filter((_, i) => i !== index))

  return (
    <Field label={label} hint={hint}>
      <ol className="flex flex-col gap-2">
        {value.map((item, index) => (
          <li key={index} className="flex animate-chip-in items-center gap-2">
            <span className="w-5 shrink-0 text-sm text-muted">{index + 1}.</span>
            <input
              value={item}
              onChange={(event) => update(index, event.target.value)}
              placeholder={placeholder}
              aria-label={`${label} ${index + 1}`}
              className={cn(controlClassName(false), 'h-11')}
            />
            <button
              type="button"
              onClick={() => remove(index)}
              className="flex size-11 shrink-0 items-center justify-center rounded-xl text-muted transition-colors hover:bg-lavender hover:text-danger"
              aria-label="Удалить"
            >
              <TrashIcon className="size-5" />
            </button>
          </li>
        ))}
      </ol>
      {value.length < max && (
        <button
          type="button"
          onClick={() => onChange([...value, ''])}
          className="flex h-11 items-center justify-center gap-2 rounded-xl border border-dashed border-lavender-dark text-sm font-medium text-primary transition-colors hover:border-primary hover:bg-mint"
        >
          <PlusIcon className="size-4" />
          {addLabel}
        </button>
      )}
    </Field>
  )
}
