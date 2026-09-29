import { useMemo, useState } from 'react'
import { ReviewCard } from '@/components/cards/ReviewCard'
import { StarIcon } from '@/components/icons'
import { Container, EmptyState, LoadMore, Reveal, SectionHeader, Tabs } from '@/components/ui'
import { useLoadMore } from '@/hooks/useLoadMore'
import { getReviews, isPositiveReview } from '@/services/dataService'

/** Отзывы о фрилансере с вкладками «Положительные» / «Отрицательные» */
export function ProfileReviews({ user, isOwner }) {
  const [tab, setTab] = useState('positive')
  const { positive, negative } = useMemo(() => {
    const reviews = getReviews(user.id)
    return { positive: reviews.filter(isPositiveReview), negative: reviews.filter((r) => !isPositiveReview(r)) }
  }, [user.id])

  const list = tab === 'positive' ? positive : negative
  const { visible, hasMore, loadMore } = useLoadMore(list, { initial: 6, step: 6, resetKey: tab })
  const total = positive.length + negative.length

  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeader title="Отзывы" className="mb-4 md:mb-5" />

        {total === 0 ? (
          <EmptyState
            icon={StarIcon}
            title="Отзывов пока нет"
            text={
              isOwner
                ? 'Выполняйте заказы — после каждой сделки заказчик сможет оставить отзыв'
                : 'У этого фрилансера ещё нет отзывов'
            }
            className="mt-6"
          />
        ) : (
          <>
            <Tabs
              value={tab}
              onChange={setTab}
              tabs={[
                { value: 'positive', label: `Положительные (${positive.length})` },
                { value: 'negative', label: `Отрицательные (${negative.length})` },
              ]}
              className="mb-8"
            />

            {list.length === 0 ? (
              <p className="animate-fade-up py-10 text-center text-sm text-muted">Здесь пока ничего нет</p>
            ) : (
              // key по вкладке — карточки заново проявляются при переключении
              <ul key={tab} className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {visible.map((review, index) => (
                  <Reveal as="li" key={review.id} delay={(index % 3) * 90}>
                    <ReviewCard review={review} />
                  </Reveal>
                ))}
              </ul>
            )}
            <LoadMore hasMore={hasMore} onClick={loadMore} />
          </>
        )}
      </Container>
    </section>
  )
}
