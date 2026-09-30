import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { WorkCard } from '@/components/cards/WorkCard'
import { PlusIcon } from '@/components/icons'
import { Button, Chip, Container, Dropdown, EmptyState, LoadMore, Reveal, SearchBar } from '@/components/ui'
import { CATEGORIES } from '@/data/mock/categories'
import { ROUTES } from '@/constants/routes'
import { useLoadMore } from '@/hooks/useLoadMore'
import { useWorks } from '@/hooks/useWorks'
import { getFullName } from '@/lib/format'

const SORT_OPTIONS = [
  { value: 'popular', label: 'Сначала популярные' },
  { value: 'price-asc', label: 'Сначала дешевле' },
  { value: 'price-desc', label: 'Сначала дороже' },
]

export function WorksPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const allWorks = useWorks()
  const query = searchParams.get('q') ?? ''
  const categoryId = searchParams.get('category') ?? 'all'
  const sort = searchParams.get('sort') ?? 'popular'
  const selectedCategory = CATEGORIES.find((category) => category.id === categoryId)

  const updateFilters = (updates) => {
    const nextParams = new URLSearchParams(searchParams)
    Object.entries(updates).forEach(([key, value]) => {
      if (value) nextParams.set(key, value)
      else nextParams.delete(key)
    })
    setSearchParams(nextParams, { replace: true })
  }

  const works = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('ru')
    const filtered = allWorks.filter((work) => {
      const workCategoryId = work.categoryId ?? work.author?.profile?.categoryId
      const matchesCategory = categoryId === 'all' || workCategoryId === categoryId
      const haystack = `${work.title} ${getFullName(work.author)}`.toLocaleLowerCase('ru')
      return matchesCategory && (!normalizedQuery || haystack.includes(normalizedQuery))
    })

    if (sort === 'price-asc') return filtered.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') return filtered.sort((a, b) => b.price - a.price)
    return filtered.sort((a, b) => b.rating - a.rating)
  }, [allWorks, categoryId, query, sort])

  const resetKey = `${categoryId}:${query}:${sort}`
  const { visible, hasMore, loadMore } = useLoadMore(works, { initial: 20, step: 8, resetKey })

  return (
    <main className="min-h-screen">
      <Container className="pb-14 pt-7 md:pb-16 md:pt-10">
        <SearchBar
          key={query}
          defaultValue={query}
          placeholder="Найти ворк или услугу"
          buttonLabel="Найти"
          onSearch={(value) => updateFilters({ q: value })}
          className="mx-auto max-w-2xl"
        />

        <nav
          aria-label="Категории ворков"
          className="-mx-4 mt-6 flex gap-2 overflow-x-auto px-4 pb-2 md:mx-0 md:flex-wrap md:justify-center md:px-0"
        >
          <Chip
            variant="ghost"
            aria-pressed={categoryId === 'all'}
            onClick={() => updateFilters({ category: '' })}
            className={categoryId === 'all' ? 'border-primary bg-primary text-white hover:bg-primary-dark hover:text-white' : ''}
          >
            Все категории
          </Chip>
          {CATEGORIES.map((category) => (
            <Chip
              key={category.id}
              variant="ghost"
              aria-pressed={categoryId === category.id}
              onClick={() => updateFilters({ category: category.id })}
              className={categoryId === category.id ? 'border-primary bg-primary text-white hover:bg-primary-dark hover:text-white' : ''}
            >
              {category.title}
            </Chip>
          ))}
        </nav>

        <div className="mt-8 flex flex-col gap-4 border-b border-line pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-bold md:text-2xl">{works.length} ворков</h1>
            <p className="mt-1 text-sm text-muted">
              {selectedCategory ? `Категория: ${selectedCategory.title}` : 'Подберите услугу для своего проекта'}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 self-start sm:self-auto">
            <Button to={ROUTES.createWork}>
              <PlusIcon className="size-4" />
              Добавить ворк
            </Button>
            <Dropdown
              label="Сортировка"
              options={SORT_OPTIONS}
              value={SORT_OPTIONS.some((option) => option.value === sort) ? sort : 'popular'}
              onChange={(value) => updateFilters({ sort: value === 'popular' ? '' : value })}
            />
          </div>
        </div>

        {works.length === 0 ? (
          <EmptyState
            title="Ничего не найдено"
            text="Попробуйте изменить запрос или выбрать другую категорию."
            action={
              <Button variant="outline" onClick={() => setSearchParams({}, { replace: true })}>
                Сбросить фильтры
              </Button>
            }
            className="mt-8"
          />
        ) : (
          <ul className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visible.map((work, index) => (
              <Reveal as="li" key={work.id} delay={(index % 4) * 50}>
                <WorkCard work={work} showSeller showFavorite />
              </Reveal>
            ))}
          </ul>
        )}

        <LoadMore hasMore={hasMore} onClick={loadMore} />
      </Container>
    </main>
  )
}