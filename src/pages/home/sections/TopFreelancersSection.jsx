import { FreelancerCard } from '@/components/cards/FreelancerCard'
import { Container, Reveal, SectionHeader, ViewAllCard } from '@/components/ui'
import { ROUTES } from '@/constants/routes'
import { TOP_FREELANCERS } from '@/data/mock/freelancers'

const staggerDelay = (index) => (index % 3) * 110

export function TopFreelancersSection() {
  return (
    <section className="pt-16 md:pt-24">
      <Container>
        <SectionHeader title="Топ фрилансеров" />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {TOP_FREELANCERS.map((freelancer, index) => (
            <Reveal as="li" key={freelancer.id} delay={staggerDelay(index)}>
              <FreelancerCard freelancer={freelancer} animateRating />
            </Reveal>
          ))}
          <Reveal as="li" variant="zoom" delay={staggerDelay(TOP_FREELANCERS.length)}>
            <ViewAllCard to={ROUTES.freelancers} label="Посмотреть всех ТОП фрилансеров" className="h-full" />
          </Reveal>
        </ul>
      </Container>
    </section>
  )
}
