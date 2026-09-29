import { CardPaymentIcon, ClockIcon, MoneyIcon } from '@/components/icons'
import { Button, Container, Reveal } from '@/components/ui'
import { IMAGES } from '@/constants/images'
import { ROUTES } from '@/constants/routes'

const BENEFITS = [
  { text: 'Оплачивайте с р/с или карты компании', Icon: CardPaymentIcon },
  { text: 'Экономьте до 87% бюджета на фриланс', Icon: MoneyIcon },
  { text: 'Экономьте до 75% времени на решении фриланс задач', Icon: ClockIcon },
]

export function BusinessPromoSection() {
  return (
    <section className="relative overflow-hidden bg-sun">
      {/* декоративные полупрозрачные круги */}
      <span className="pointer-events-none absolute -top-24 -left-24 size-72 animate-float-slow rounded-full bg-white/10" />
      <span className="pointer-events-none absolute bottom-10 left-[38%] size-24 animate-float rounded-full bg-white/10 [animation-delay:-2s]" />

      <Container className="grid items-center gap-12 py-14 md:py-16 lg:grid-cols-2 lg:py-20">
        <div className="relative z-10">
          <Reveal as="h2" className="text-xl font-bold text-white md:text-2xl">
            Как WorkTap помогает бизнесу?
          </Reveal>

          <ul className="mt-8 flex max-w-[530px] flex-col gap-4 md:gap-5">
            {BENEFITS.map(({ text, Icon }, index) => (
              <Reveal as="li" key={text} variant="left" delay={100 + index * 120}>
                <div className="group flex min-h-[72px] items-center gap-5 rounded-2xl bg-white px-6 py-4 transition-[translate,box-shadow] duration-300 ease-out-expo hover:translate-x-2 hover:shadow-card md:min-h-[88px] md:px-8">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-surface transition-transform duration-500 ease-spring group-hover:scale-110 group-hover:-rotate-6">
                    <Icon className="size-9 md:size-10" />
                  </span>
                  <span className="text-xs md:text-sm">{text}</span>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={450}>
            <p className="mt-8 text-base font-semibold text-white md:text-lg">WorkTap — быстро, просто и безопасно!</p>

            <Button to={ROUTES.register} variant="violet" size="lg" className="mt-8 animate-pulse-ring">
              Начать!
            </Button>
          </Reveal>
        </div>

        {/* на мобильных — под текстом, на десктопе — на всю правую половину секции, медленно «дышит» */}
        <Reveal
          as="img"
          variant="fade"
          src={IMAGES.businessPromo}
          alt="Планшет, блокнот и очки на рабочем столе"
          loading="lazy"
          className="w-full rounded-2xl lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-1/2 lg:animate-drift lg:rounded-none lg:object-cover lg:[mask-image:linear-gradient(to_right,transparent,black_30%)]"
        />
      </Container>
    </section>
  )
}
