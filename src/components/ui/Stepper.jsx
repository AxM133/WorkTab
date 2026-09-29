import { CheckIcon } from '@/components/icons'
import { cn } from '@/lib/cn'

/**
 * Степпер мастера: пройденные шаги — зелёные с галочкой, текущий — зелёный, будущие — светло-фиолетовые.
 * На мобильных сокращается до «Шаг N из M» с прогресс-баром.
 */
export function Stepper({ steps, current, className }) {
  return (
    <div className={className}>
      <div className="sm:hidden">
        <p className="text-xs font-medium text-muted">
          Шаг {current + 1} из {steps.length}
          <span className="ml-2 font-semibold text-ink">{steps[current]}</span>
        </p>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-lavender">
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-500 ease-out-expo"
            style={{ width: `${((current + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      <ol className="hidden items-start sm:flex">
        {steps.map((step, index) => {
          const isDone = index < current
          const isCurrent = index === current
          return (
            <li key={step} className="flex flex-1 items-start last:flex-none">
              <div className="flex flex-col items-center gap-2">
                <span
                  className={cn(
                    'flex size-9 items-center justify-center rounded-full text-sm font-semibold transition-[background-color,color,box-shadow] duration-300',
                    isDone && 'bg-primary text-white',
                    isCurrent && 'bg-primary text-white ring-4 ring-primary/20',
                    !isDone && !isCurrent && 'bg-lavender text-violet',
                  )}
                  aria-current={isCurrent ? 'step' : undefined}
                >
                  {isDone ? <CheckIcon className="size-4 animate-pop" /> : index + 1}
                </span>
                <span
                  className={cn(
                    'max-w-24 text-center text-[11px] leading-tight font-medium transition-colors',
                    isDone || isCurrent ? 'text-ink' : 'text-muted',
                  )}
                >
                  {step}
                </span>
              </div>
              {index < steps.length - 1 && (
                <span className="relative mx-2 mt-[17px] h-0.5 flex-1 overflow-hidden rounded-full bg-lavender">
                  <span
                    className="absolute inset-y-0 left-0 bg-primary transition-[width] duration-500 ease-out-expo"
                    style={{ width: isDone ? '100%' : '0%' }}
                  />
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </div>
  )
}
