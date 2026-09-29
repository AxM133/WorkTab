import { useNavigate } from 'react-router-dom'
import { Container, SearchBar } from '@/components/ui'
import { ROUTES } from '@/constants/routes'
import { CATEGORIES } from '@/data/mock/categories'
import { CategoryPicker } from './CategoryPicker'
import { HeroVisual } from './HeroVisual'

export function HeroSection() {
  const navigate = useNavigate()

  const handleSearch = (query) => {
    navigate(query ? `${ROUTES.works}?q=${encodeURIComponent(query)}` : ROUTES.works)
  }

  return (
    <section className="relative overflow-hidden bg-surface pt-6 pb-16 md:pt-10 md:pb-24">
      {/* мягкие цветные пятна на фоне */}
      <span className="pointer-events-none absolute top-[25%] -left-40 size-[380px] animate-blob rounded-full bg-primary/8 blur-3xl" />
      <span className="pointer-events-none absolute top-[20%] -right-32 size-[420px] animate-blob rounded-full bg-peach/40 blur-3xl [animation-delay:-6s]" />

      <Container className="relative grid items-center gap-12 lg:grid-cols-[1fr_minmax(0,560px)] lg:gap-8">
        <div>
          <h1 className="animate-fade-up text-[26px] leading-tight font-bold sm:text-3xl lg:text-[36px]">
            Покупайте фриланс-услуги
            <br />в{' '}
            <span className="relative inline-block text-primary">
              два клика
              <svg
                className="absolute -bottom-2 left-0 h-3 w-full text-primary/40"
                viewBox="0 0 200 12"
                preserveAspectRatio="none"
                aria-hidden
              >
                <path
                  d="M3 9C50 3 150 2 197 7"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                  pathLength="1"
                  strokeDasharray="1"
                  className="animate-draw"
                />
              </svg>
            </span>
          </h1>
          <p className="mt-5 max-w-[460px] animate-fade-up text-sm leading-relaxed [animation-delay:120ms] md:text-base">
            Ворк — единица работы продавца, которую можно купить как товар в магазине
          </p>

          <div className="mt-8 max-w-[520px] animate-fade-up [animation-delay:240ms] md:mt-10">
            <SearchBar onSearch={handleSearch} />
          </div>

          <div className="mt-10 animate-fade-up [animation-delay:360ms] md:mt-14">
            <CategoryPicker categories={CATEGORIES} />
          </div>
        </div>

        <HeroVisual />
      </Container>
    </section>
  )
}
