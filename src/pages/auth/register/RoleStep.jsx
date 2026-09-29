import { BagIcon, BriefcaseIcon, CheckIcon } from '@/components/icons'
import { ROLES } from '@/constants/profile'
import { cn } from '@/lib/cn'

const OPTIONS = [
  {
    role: ROLES.client,
    icon: BagIcon,
    title: 'Я заказчик',
    text: 'Ищу исполнителей, покупаю ворки и публикую задачи',
    perks: ['Быстрая регистрация', 'История покупок и заказов', 'Безопасная сделка'],
  },
  {
    role: ROLES.freelancer,
    icon: BriefcaseIcon,
    title: 'Я фрилансер',
    text: 'Выполняю заказы и продаю свои услуги — ворки',
    perks: ['Профиль с портфолио', 'Отзывы и рейтинг', 'История выполненных работ'],
  },
]

export function RoleStep({ value, onChange, error }) {
  return (
    <div>
      <div role="radiogroup" aria-label="Роль на сайте" className="grid gap-4 sm:grid-cols-2">
        {OPTIONS.map(({ role, icon: Icon, title, text, perks }) => {
          const isSelected = value === role
          return (
            <button
              key={role}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onChange(role)}
              className={cn(
                'group relative flex flex-col rounded-3xl border-2 p-5 text-left transition-[border-color,background-color,box-shadow,translate] duration-300 ease-out-expo hover:-translate-y-1',
                isSelected
                  ? 'border-primary bg-mint/40 shadow-card'
                  : 'border-line bg-white hover:border-lavender-dark hover:shadow-soft',
              )}
            >
              <span
                className={cn(
                  'flex size-14 items-center justify-center rounded-2xl transition-colors duration-300',
                  isSelected ? 'bg-primary text-white' : 'bg-lavender text-primary',
                )}
              >
                <Icon className="size-7 transition-transform duration-500 ease-spring group-hover:-rotate-6" />
              </span>
              <span className="mt-4 text-lg font-bold">{title}</span>
              <span className="mt-1 text-sm text-body">{text}</span>
              <ul className="mt-4 flex flex-col gap-1.5">
                {perks.map((perk) => (
                  <li key={perk} className="flex items-center gap-2 text-xs text-body">
                    <CheckIcon className="size-3.5 shrink-0 text-primary" />
                    {perk}
                  </li>
                ))}
              </ul>

              <span
                className={cn(
                  'absolute top-4 right-4 flex size-6 items-center justify-center rounded-full border-2 transition-colors',
                  isSelected ? 'border-primary bg-primary text-white' : 'border-lavender-dark',
                )}
              >
                {isSelected && <CheckIcon className="size-3.5 animate-pop" />}
              </span>
            </button>
          )
        })}
      </div>
      {error && (
        <p className="mt-3 text-xs text-danger" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
