import { Button, Modal } from '@/components/ui'
import {
  CategoryIllustration,
  PaymentIllustration,
  SpecialistIllustration,
  WorkIllustration,
} from './stepIllustrations'

const STEPS = [
  {
    title: 'Укажите вид работы и категорию',
    text: 'Опишите задачу или выберите нужную категорию в каталоге ворков — мы покажем подходящие услуги и исполнителей.',
    Illustration: CategoryIllustration,
  },
  {
    title: 'Выберите специалиста',
    text: 'Каждый специалист перед началом работы проходит тщательную проверку, имеет рейтинг и отзывы предыдущих заказчиков.',
    Illustration: SpecialistIllustration,
  },
  {
    title: 'Оплатите услугу',
    text: 'Деньги резервируются на счёте WorkTap и поступят исполнителю только после того, как вы примете работу.',
    Illustration: PaymentIllustration,
  },
  {
    title: 'Специалист выполняет работу',
    text: 'После выполнения заказа у вас будет возможность поставить специалисту оценку и написать отзыв.',
    Illustration: WorkIllustration,
  },
]

export function HowItWorksModal({ open, onClose }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Как это работает"
      footer={
        <Button size="lg" onClick={onClose} className="w-full sm:w-96">
          Понятно
        </Button>
      }
    >
      <ol className="grid gap-x-8 gap-y-12 px-6 py-6 sm:grid-cols-2 md:px-10 md:py-10 lg:grid-cols-4">
        {STEPS.map(({ title, text, Illustration }, index) => (
          <li key={title} className="group animate-fade-up" style={{ animationDelay: `${150 + index * 120}ms` }}>
            <Illustration className="mx-auto h-auto w-full max-w-72 transition-transform duration-500 ease-out-expo group-hover:-translate-y-1 sm:max-w-none" />
            <p className="mt-6 text-xs font-semibold tracking-wider text-primary uppercase">Шаг {index + 1}</p>
            <h3 className="mt-1 text-lg leading-snug font-semibold">{title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-body">{text}</p>
          </li>
        ))}
      </ol>
    </Modal>
  )
}
