import { useState } from 'react'
import {
  BriefcaseIcon,
  ChevronDownIcon,
  DocumentIcon,
  EducationIcon,
  GlobeIcon,
  TimeIcon,
  TranslateIcon,
} from '@/components/icons'
import { cn } from '@/lib/cn'
import { formatSiteDuration } from '@/lib/format'

function buildRows(user) {
  const profile = user.profile ?? {}
  const location = [profile.country, profile.city].filter(Boolean).join(', ')
  return [
    { label: 'Услуги', icon: BriefcaseIcon, value: profile.services },
    { label: 'Страна', icon: GlobeIcon, value: location },
    { label: 'На сайте', icon: TimeIcon, value: formatSiteDuration(user.createdAt) },
    { label: 'Образование', icon: EducationIcon, value: profile.education },
    { label: 'Знание языков', icon: TranslateIcon, value: profile.languages },
    { label: 'Сертификаты', icon: DocumentIcon, value: profile.certificates },
  ].filter(({ value }) => (Array.isArray(value) ? value.length > 0 : Boolean(value)))
}

/** Раскрывающийся блок «Показать подробную информацию» */
export function ProfileDetails({ user }) {
  const [isOpen, setIsOpen] = useState(false)
  const rows = buildRows(user)

  return (
    <div className="max-w-[560px] rounded-2xl bg-lavender transition-shadow duration-300 hover:shadow-soft">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left text-sm font-medium"
      >
        {isOpen ? 'Скрыть подробную информацию' : 'Показать подробную информацию'}
        <ChevronDownIcon className={cn('size-4 shrink-0 transition-transform duration-300', isOpen && 'rotate-180')} />
      </button>

      {/* плавное раскрытие на высоту содержимого через grid-template-rows */}
      <div
        className={cn(
          'grid transition-[grid-template-rows] duration-500 ease-out-expo',
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="overflow-hidden">
          <dl className="flex flex-col gap-4 px-6 pb-6">
            {rows.map(({ label, icon: Icon, value }, index) => (
              <div
                key={label}
                className={cn(
                  'grid gap-1 text-sm transition-[opacity,translate] duration-500 sm:grid-cols-[170px_1fr] sm:gap-4',
                  isOpen ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0',
                )}
                style={{ transitionDelay: isOpen ? `${100 + index * 50}ms` : '0ms' }}
              >
                <dt className="flex items-center gap-2 font-medium">
                  <Icon className="size-4 shrink-0" />
                  {label}:
                </dt>
                <dd className="text-body">
                  {Array.isArray(value) ? (
                    <ol className="flex list-decimal flex-col gap-1 pl-4">
                      {value.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ol>
                  ) : (
                    value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
