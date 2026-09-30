import { Link, useNavigate, useParams } from 'react-router-dom'
import { FavoriteButton } from '@/components/cards/FavoriteButton'
import { WorkCard } from '@/components/cards/WorkCard'
import { WorkOwnerActions } from '@/components/works/WorkOwnerActions'
import { Avatar, Button, Container, Rating } from '@/components/ui'
import { ROUTES } from '@/constants/routes'
import { CATEGORIES } from '@/data/mock/categories'
import { useWorks } from '@/hooks/useWorks'
import { formatPrice, getFullName } from '@/lib/format'

export function WorkDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const works = useWorks()
  const work = works.find((item) => item.id === id)

  if (!work) {
    return (
      <main className="min-h-screen">
        <Container className="flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
          <h1 className="text-2xl font-bold">Ворк не найден</h1>
          <p className="mt-2 text-sm text-muted">Возможно, он был удалён или ссылка устарела.</p>
          <Button to={ROUTES.works} className="mt-6">Вернуться в каталог</Button>
        </Container>
      </main>
    )
  }

  const category = CATEGORIES.find((item) => item.id === (work.categoryId ?? work.author?.profile?.categoryId))
  const authorName = getFullName(work.author)
  const relatedWorks = works.filter(
    (item) => item.id !== work.id && (item.categoryId ?? item.author?.profile?.categoryId) === category?.id,
  ).slice(0, 3)

  return (
    <main className="min-h-screen">
      <Container className="pb-14 pt-7 md:pb-16 md:pt-10">
        <nav aria-label="Хлебные крошки" className="flex flex-wrap items-center gap-2 text-sm text-muted">
          <Link to={ROUTES.works} className="transition-colors hover:text-primary">Каталог ворков</Link>
          <span aria-hidden="true">/</span>
          {category && (
            <>
              <Link
                to={`${ROUTES.works}?category=${category.id}`}
                className="transition-colors hover:text-primary"
              >
                {category.title}
              </Link>
              <span aria-hidden="true">/</span>
            </>
          )}
          <span className="max-w-full truncate text-ink" aria-current="page">{work.title}</span>
        </nav>

        <div className="mt-7 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10">
          <article className="min-w-0">
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-lavender">
              <img src={work.cover} alt={work.title} className="size-full object-cover" />
              <FavoriteButton workId={work.id} className="absolute right-4 top-4" />
            </div>

            <h1 className="mt-6 text-2xl font-bold leading-tight md:text-3xl">{work.title}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
              <Rating value={work.rating} size="sm" />
              <span className="text-muted">Рейтинг исполнителя</span>
              {category && (
                <Link to={`${ROUTES.works}?category=${category.id}`} className="font-medium text-primary hover:text-primary-dark">
                  {category.title}
                </Link>
              )}
            </div>

            <section className="mt-9 border-t border-line pt-7">
              <h2 className="text-lg font-bold">Об услуге</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-body">
                {work.description ||
                  `${work.title}. Обсудите задачу и пожелания к результату напрямую с исполнителем. Детали проекта можно согласовать до начала работы.`}
              </p>
            </section>

            <section className="mt-8 border-t border-line pt-7">
              <h2 className="text-lg font-bold">Исполнитель</h2>
              <Link to={ROUTES.profile(work.author.id)} className="group mt-4 inline-flex items-center gap-4">
                <Avatar src={work.author.avatar} name={authorName} size={56} />
                <span>
                  <span className="block font-semibold transition-colors group-hover:text-primary">{authorName}</span>
                  <span className="mt-1 block text-sm text-muted">
                    {work.author.completedProjects} выполненных проектов
                  </span>
                </span>
              </Link>
            </section>
          </article>

          <aside className="h-fit border-t border-line pt-5 lg:sticky lg:top-8 lg:rounded-xl lg:border lg:bg-white lg:p-6 lg:shadow-soft">
            <p className="text-sm text-muted">Стоимость услуги</p>
            <p className="mt-1 text-2xl font-bold text-primary">{formatPrice(work.price)}</p>
            <p className="mt-4 text-sm leading-6 text-body">
              Уточните детали и договоритесь о сроках с исполнителем перед началом работы.
            </p>
            <Button to={ROUTES.profile(work.author.id)} fullWidth className="mt-5">
              Профиль исполнителя
            </Button>
            <WorkOwnerActions work={work} onDeleted={() => navigate(ROUTES.works)} className="mt-3" />
            <Link
              to={ROUTES.works}
              className="mt-4 block text-center text-sm font-medium text-primary transition-colors hover:text-primary-dark"
            >
              Вернуться в каталог
            </Link>
          </aside>
        </div>

        {relatedWorks.length > 0 && (
          <section className="mt-14 border-t border-line pt-8">
            <h2 className="text-xl font-bold">Похожие ворки</h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedWorks.map((item) => (
                <li key={item.id}>
                  <WorkCard work={item} showSeller showFavorite />
                </li>
              ))}
            </ul>
          </section>
        )}
      </Container>
    </main>
  )
}