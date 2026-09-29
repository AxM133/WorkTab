import { CheckIcon } from '@/components/icons'
import { Field, Input } from '@/components/ui'
import { SPECIALIZATIONS } from '@/constants/profile'
import { CATEGORIES } from '@/data/mock/categories'
import { cn } from '@/lib/cn'

/** Шаг «Чем вы занимаетесь»: специализация, категория и направления внутри неё */
export function SpecializationFields({ values, errors, onChange }) {
  const category = CATEGORIES.find((item) => item.id === values.categoryId)

  const selectCategory = (id) => {
    if (id === values.categoryId) return
    onChange('categoryId', id)
    onChange('services', [])
  }

  const toggleService = (service) =>
    onChange(
      'services',
      values.services.includes(service)
        ? values.services.filter((item) => item !== service)
        : [...values.services, service],
    )

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-3">
        <Input
          label="Специализация"
          required
          value={values.specialization}
          onChange={(event) => onChange('specialization', event.target.value)}
          placeholder="Например: Дизайнер"
          error={errors.specialization}
          hint="Будет показана в профиле над вашим именем"
          maxLength={40}
        />
        <div className="flex flex-wrap gap-2">
          {SPECIALIZATIONS.slice(0, 8).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => onChange('specialization', item)}
              className={cn(
                'rounded-full border px-3 py-1 text-xs transition-colors',
                values.specialization === item
                  ? 'border-primary bg-primary text-white'
                  : 'border-line hover:border-primary hover:text-primary',
              )}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <Field label="Категория услуг" required error={errors.categoryId}>
        <div role="radiogroup" className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {CATEGORIES.map((item) => {
            const isSelected = item.id === values.categoryId
            return (
              <button
                key={item.id}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => selectCategory(item.id)}
                className={cn(
                  'relative rounded-xl border px-3 py-3 text-left text-xs font-medium transition-[border-color,background-color,box-shadow] duration-200 sm:text-sm',
                  isSelected
                    ? 'border-primary bg-mint/60 text-primary shadow-soft'
                    : 'border-line bg-white hover:border-lavender-dark',
                )}
              >
                {item.title}
                {isSelected && (
                  <CheckIcon className="absolute top-2 right-2 size-3.5 animate-pop text-primary" aria-hidden />
                )}
              </button>
            )
          })}
        </div>
      </Field>

      {category && (
        <Field
          label="Что вы умеете делать?"
          required
          error={errors.services}
          hint="Отметьте все направления, в которых готовы брать заказы"
          className="animate-fade-up"
        >
          <div className="flex flex-wrap gap-2">
            {category.subcategories.map((service) => {
              const isSelected = values.services.includes(service)
              return (
                <button
                  key={service}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => toggleService(service)}
                  className={cn(
                    'flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-medium transition-[border-color,background-color,color] duration-200',
                    isSelected
                      ? 'border-primary bg-primary text-white'
                      : 'border-line bg-white hover:border-primary hover:text-primary',
                  )}
                >
                  {isSelected && <CheckIcon className="size-3.5 animate-pop" />}
                  {service}
                </button>
              )
            })}
          </div>
        </Field>
      )}
    </div>
  )
}
