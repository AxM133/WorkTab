import { useMemo } from 'react'
import { WorkCard } from '@/components/cards/WorkCard'
import { StarIcon } from '@/components/icons'
import { Button, Container, EmptyState, LoadMore, PageHeading, Reveal } from '@/components/ui'
import { ROUTES } from '@/constants/routes'
import { useFavorites } from '@/hooks/useFavorites'
import { useLoadMore } from '@/hooks/useLoadMore'
import { getWork } from '@/services/dataService'

export function FavoritesPage() {
  const { ids } = useFavorites()
  const works = useMemo(() => ids.map(getWork).filter(Boolean), [ids])
  const { visible, hasMore, loadMore } = useLoadMore(works, { initial: 20, step: 8 })

  return (
    <Container className="py-10 md:py-14">
      <PageHeading>
        <span className="text-accent">Избранные</span> ворки
      </PageHeading>

      {works.length === 0 ? (
        <EmptyState
          icon={StarIcon}
          title="В избранном пока пусто"
          text="Нажимайте на звёздочку на карточке ворка, чтобы сохранить его здесь"
          action={<Button to={ROUTES.works}>Смотреть ворки</Button>}
          className="mt-12"
        />
      ) : (
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:mt-14">
          {visible.map((work, index) => (
            <Reveal as="li" key={work.id} delay={(index % 4) * 70}>
              <WorkCard work={work} showSeller showFavorite />
            </Reveal>
          ))}
        </ul>
      )}

      <LoadMore hasMore={hasMore} onClick={loadMore} />
    </Container>
  )
}
