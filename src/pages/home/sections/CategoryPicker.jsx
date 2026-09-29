import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeftIcon } from '@/components/icons'
import { Chip } from '@/components/ui'
import { ROUTES } from '@/constants/routes'

/** Выбор рубрики: клик по категории показывает её подкатегории, «‹ Категория» — возврат к списку */
export function CategoryPicker({ categories }) {
  const navigate = useNavigate()
  const [activeId, setActiveId] = useState(null)
  // при первом показе теги ждут, пока проявится весь hero; при переключении — появляются сразу
  const [hasSwitched, setHasSwitched] = useState(false)
  const active = categories.find((category) => category.id === activeId)

  const selectCategory = (id) => {
    setActiveId(id)
    setHasSwitched(true)
  }

  const goToCatalog = (params = {}) => {
    const query = new URLSearchParams(params).toString()
    navigate(query ? `${ROUTES.works}?${query}` : ROUTES.works)
  }

  const items = active
    ? [
        <Chip key="back" variant="primary" onClick={() => selectCategory(null)} aria-label="Назад к рубрикам">
          <ChevronLeftIcon className="size-3.5" />
          {active.title}
        </Chip>,
        ...active.subcategories.map((sub) => (
          <Chip key={sub} onClick={() => goToCatalog({ category: active.id, subcategory: sub })}>
            {sub}
          </Chip>
        )),
        <Chip key="all" variant="accent" onClick={() => goToCatalog({ category: active.id })}>
          Все подкатегории
        </Chip>,
      ]
    : [
        ...categories.map((category) => (
          <Chip key={category.id} onClick={() => selectCategory(category.id)}>
            {category.title}
          </Chip>
        )),
        <Chip key="all" variant="accent" onClick={() => goToCatalog()}>
          Все категории
        </Chip>,
      ]

  return (
    <div>
      <p className="mb-4 text-sm font-medium">Выберите рубрику, чтобы начать</p>

      {/* key пересоздаёт список при смене рубрики, чтобы анимация появления проигралась заново */}
      <ul key={activeId ?? 'root'} className="flex max-w-[560px] flex-wrap gap-x-2 gap-y-3" aria-live="polite">
        {items.map((chip, index) => (
          <li
            key={chip.key}
            className="animate-chip-in"
            style={{ animationDelay: `${(hasSwitched ? 0 : 450) + index * 45}ms` }}
          >
            {chip}
          </li>
        ))}
      </ul>
    </div>
  )
}
