import { Dropdown, RadioToggle } from '@/components/ui'
import { DEAL_STATUS, SORT_OPTIONS } from '@/constants/deals'

/** Строка над списком: «Всего N …», фильтр по статусу (опционально) и сортировка */
export function ListToolbar({ summary, status, onStatusChange, sort, onSortChange }) {
  return (
    <div className="relative z-20 mt-10 mb-8 flex animate-fade-up flex-wrap items-center justify-between gap-x-8 gap-y-4 [animation-delay:100ms] md:mt-14">
      <p className="text-lg font-semibold md:text-xl">{summary}</p>

      {onStatusChange && (
        <div role="radiogroup" aria-label="Статус" className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <span className="text-sm font-semibold">Показать только:</span>
          {Object.entries(DEAL_STATUS).map(([value, { label }]) => (
            <RadioToggle
              key={value}
              label={label}
              checked={status === value}
              onChange={(checked) => onStatusChange(checked ? value : null)}
            />
          ))}
        </div>
      )}

      <Dropdown value={sort} options={SORT_OPTIONS} onChange={onSortChange} />
    </div>
  )
}
