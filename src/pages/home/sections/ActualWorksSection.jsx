import { WorkPreviewCard } from '@/components/cards/WorkPreviewCard'
import { Container, Reveal, SectionHeader, ViewAllCard } from '@/components/ui'
import { ROUTES } from '@/constants/routes'
import { ACTUAL_WORKS } from '@/data/mock/works'

// каскад по колонкам: карточки одного ряда появляются друг за другом
const staggerDelay = (index) => (index % 3) * 110

export function ActualWorksSection() {
  return (
    <section className="pt-16 md:pt-28">
      <Container>
        <SectionHeader title="Актуальные ворки" />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {ACTUAL_WORKS.map((work, index) => (
            <Reveal as="li" key={work.id} delay={staggerDelay(index)}>
              <WorkPreviewCard work={work} />
            </Reveal>
          ))}
          <Reveal as="li" variant="zoom" delay={staggerDelay(ACTUAL_WORKS.length)}>
            <ViewAllCard to={ROUTES.works} label="Смотреть все ворки" className="h-full" />
          </Reveal>
        </ul>
      </Container>
    </section>
  )
}
