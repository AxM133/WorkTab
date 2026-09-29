import { ChooseServiceIllustration, PaymentIllustration, ResultIllustration } from '@/components/icons/illustrations'
import { InfoLink } from '@/components/info/InfoLink'
import { ArrowRightIcon } from '@/components/icons'
import { Container, Reveal, SectionHeader } from '@/components/ui'

const STEPS = [
  {
    title: 'Выберите услугу',
    text: 'В супермаркете WorkTap представлен широкий выбор услуг от квалифицированных специалистов.',
    Illustration: ChooseServiceIllustration,
  },
  {
    title: 'Оплатите',
    text: 'Деньги будут перечислены продавцу после того, как он выполнит работу, и вы её одобрите.',
    Illustration: PaymentIllustration,
  },
  {
    title: 'Получите результат',
    text: 'Наш супермаркет гарантирует вам возврат средств в полном объёме в случае невыполнения заказа.',
    Illustration: ResultIllustration,
  },
]

export function HowItWorksSection() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeader
          title="Как решать задачи на WorkTap?"
          subtitle="Идеально подходит для бизнеса и частных лиц"
          action={
            <InfoLink doc="how-it-works" className="group flex items-center gap-2 text-sm font-semibold text-primary">
              Подробнее о работе сервиса
              <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
            </InfoLink>
          }
        />
        <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {STEPS.map(({ title, text, Illustration }, index) => (
            <Reveal as="li" key={title} delay={index * 150} className="group relative max-w-[400px]">
              {/* пунктирная линия к следующему шагу (только десктоп) */}
              {index < STEPS.length - 1 && (
                <span className="absolute top-10 right-4 left-32 hidden border-t-2 border-dashed border-lavender-dark lg:block" />
              )}

              <div className="relative inline-flex size-20 items-center justify-center md:size-24">
                <span className="absolute inset-0 rounded-full bg-lavender transition-transform duration-500 ease-spring group-hover:scale-110" />
                <Illustration className="relative size-14 transition-transform duration-500 ease-spring group-hover:-translate-y-1 group-hover:-rotate-6 md:size-16" />
                <span className="absolute -top-1 -right-1 flex size-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-white shadow-glow-primary">
                  {index + 1}
                </span>
              </div>

              <h3 className="mt-5 text-base font-bold">{title}</h3>
              <p className="mt-3 text-xs leading-relaxed text-body">{text}</p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  )
}
