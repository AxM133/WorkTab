import { useEffect, useState } from 'react'
import aboutTeam from '@/assets/images/about-team.jpg'
import { Modal } from '@/components/ui'

// Цифры-заглушки: заменить на реальные показатели сервиса
const FACTS = [
  { value: 10_000, suffix: '+', label: 'проверенных специалистов' },
  { value: 50_000, suffix: '+', label: 'выполненных заказов' },
  { value: 4.8, suffix: '', label: 'средняя оценка работ', decimals: 1 },
  { value: 24, suffix: '/7', label: 'поддержка пользователей' },
]

const numberFormat = new Intl.NumberFormat('ru-RU')

/** Число «набегает» от нуля при открытии окна */
function CountUp({ value, decimals = 0, active }) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!active) return
    let frame
    const start = performance.now()
    const tick = (now) => {
      const progress = Math.min((now - start) / 1400, 1)
      setCurrent(value * (1 - (1 - progress) ** 3))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [value, active])

  return decimals ? current.toFixed(decimals).replace('.', ',') : numberFormat.format(Math.round(current))
}

export function AboutModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} title="О нас">
      <div className="px-6 pt-2 pb-8 md:px-14 md:pb-10">
        <p className="mx-auto max-w-5xl animate-fade-up text-sm leading-relaxed md:text-base">
          WorkTap — онлайн-сервис поиска частных специалистов для решения бизнес-задач в кратчайшие сроки. Наша
          платформа объединяет заказчиков услуг, которым необходимо выполнить какую-либо работу, и компетентных
          специалистов, ищущих подработку или дополнительный заработок.
        </p>

        <dl className="mx-auto mt-8 grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-4">
          {FACTS.map((fact, index) => (
            <div
              key={fact.label}
              className="flex animate-fade-up flex-col rounded-2xl bg-surface px-5 py-4 text-center"
              style={{ animationDelay: `${150 + index * 90}ms` }}
            >
              <dt className="order-2 mt-1 text-xs text-body">{fact.label}</dt>
              <dd className="text-2xl font-bold text-primary md:text-[28px]">
                <CountUp value={fact.value} decimals={fact.decimals} active={open} />
                {fact.suffix}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="overflow-hidden">
        <img
          src={aboutTeam}
          alt="Команда WorkTap на общей встрече"
          className="aspect-[16/9] w-full animate-drift object-cover md:aspect-[16/7]"
        />
      </div>
    </Modal>
  )
}
