import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { WorkCard } from '@/components/cards/WorkCard'
import { BriefcaseIcon, PlusIcon } from '@/components/icons'
import { Container, EmptyState, LoadMore, Reveal, SectionHeader } from '@/components/ui'
import { ROUTES } from '@/constants/routes'
import { useLoadMore } from '@/hooks/useLoadMore'
import { getWorksByAuthor } from '@/services/dataService'

function CreateWorkCard() {
  return (
    <Link
      to={ROUTES.createWork}
      className="group flex h-full min-h-60 flex-col items-center justify-center gap-4 rounded-2xl p-6 transition-colors duration-300 hover:bg-mint"
    >
      <span className="flex size-14 items-center justify-center rounded-full bg-primary text-white shadow-glow-primary transition-transform duration-500 ease-spring group-hover:scale-110 group-hover:rotate-90">
        <PlusIcon className="size-7" />
      </span>
      <span className="text-xl font-semibold text-primary md:text-2xl">Создать ворк</span>
    </Link>
  )
}

/** «Мои ворки» — портфолио услуг фрилансера. Первая карточка у владельца — «Создать ворк» */
export function ProfileWorks({ user, isOwner }) {
  const works = useMemo(() => getWorksByAuthor(user.id), [user.id])
  // у владельца первая ячейка занята «Создать ворк», чтобы ряды оставались полными
  const { visible, hasMore, loadMore } = useLoadMore(works, { initial: isOwner ? 11 : 12, step: 8 })

  return (
    <section className="pt-16 md:pt-24">
      <Container>
        <SectionHeader title={isOwner ? 'Мои ворки' : 'Ворки'} />

        {works.length === 0 && !isOwner ? (
          <EmptyState icon={BriefcaseIcon} title="Ворков пока нет" text="Фрилансер ещё не добавил свои услуги" />
        ) : (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {isOwner && (
              <Reveal as="li" variant="zoom">
                <CreateWorkCard />
              </Reveal>
            )}
            {visible.map((work, index) => (
              <Reveal as="li" key={work.id} delay={((index + (isOwner ? 1 : 0)) % 4) * 80}>
                <WorkCard work={work} showFavorite={!isOwner} />
              </Reveal>
            ))}
          </ul>
        )}

        {isOwner && works.length === 0 && (
          <p className="mt-6 text-sm text-muted">
            Ворк — это услуга с фиксированной ценой. Создайте первый, и он появится в каталоге и в вашем профиле.
          </p>
        )}

        <LoadMore hasMore={hasMore} onClick={loadMore} />
      </Container>
    </section>
  )
}
