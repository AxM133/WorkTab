import { useRef } from 'react'
import { StarIcon } from '@/components/icons'
import { Rating } from '@/components/ui'
import { IMAGES } from '@/constants/images'
import { useMouseParallax } from '@/hooks/useMouseParallax'

/**
 * Фото фрилансера в персиковом круге с декоративными элементами.
 * Каждый декоративный элемент — «слой» parallax со своей глубиной (--depth):
 * чем больше число, тем сильнее он смещается за курсором. Отрицательное — в обратную сторону.
 */
export function HeroVisual() {
  const ref = useRef(null)
  useMouseParallax(ref)

  return (
    <div ref={ref} className="relative mx-auto aspect-square w-full max-w-[300px] sm:max-w-[420px] lg:max-w-[560px]">
      {/* маленький персиковый круг сверху */}
      <span className="parallax absolute top-[-4%] left-[8%] size-[13%]" style={{ '--depth': 30 }}>
        <span className="block size-full animate-scale-in rounded-full bg-peach-light [animation-delay:500ms]" />
      </span>

      {/* основной круг с фото: голова выходит за верх круга, низ обрезается по окружности */}
      <div className="parallax absolute top-[6%] right-0 aspect-square w-[86%]" style={{ '--depth': 6 }}>
        <div className="absolute inset-0 animate-scale-in rounded-full bg-peach" />
        <div className="absolute inset-x-0 top-[-25%] bottom-0 overflow-hidden rounded-b-full">
          <img
            src={IMAGES.heroFreelancer}
            alt="Фрилансер WorkTap"
            className="absolute bottom-0 left-1/2 w-full -translate-x-1/2 animate-rise [animation-delay:250ms]"
          />
        </div>
      </div>

      {/* оранжевый круг справа */}
      <span className="parallax absolute top-[26%] right-[2%] size-[8%]" style={{ '--depth': 40 }}>
        <span className="block size-full animate-pop [animation-delay:700ms]">
          <span className="block size-full animate-float rounded-full bg-accent" />
        </span>
      </span>

      {/* карточка с медалью */}
      <div className="parallax absolute top-[18%] left-0 size-[18%]" style={{ '--depth': 24 }}>
        <div className="size-full animate-float-slow">
          <div className="relative flex size-full animate-pop items-center justify-center rounded-2xl bg-white shadow-soft [animation-delay:800ms]">
            <span className="flex size-1/2 items-center justify-center rounded-full bg-accent ring-4 ring-peach">
              <StarIcon className="size-1/2 text-[#e5484d]" />
            </span>
            <span className="absolute -bottom-2 left-[35%] size-4 rotate-45 bg-white" />
          </div>
        </div>
      </div>

      {/* плашка рейтинга */}
      <div className="parallax absolute right-[-2%] bottom-[24%]" style={{ '--depth': 34 }}>
        <div className="animate-float [animation-delay:-3s]">
          <div className="animate-pop rounded-xl bg-white px-3 py-2.5 shadow-soft [animation-delay:950ms] sm:px-4 sm:py-3">
            <Rating value={5} size="sm" animate="mount" delay={1100} />
          </div>
        </div>
      </div>

      {/* точечная сетка снизу слева */}
      <span
        className="parallax absolute bottom-[-3%] left-[6%] h-[7%] w-[14%] opacity-70"
        style={{
          '--depth': -18,
          backgroundImage: 'radial-gradient(var(--color-accent) 1.5px, transparent 1.5px)',
          backgroundSize: '8px 8px',
        }}
      />
      {/* точечная сетка сверху справа */}
      <span
        className="parallax absolute top-[8%] right-[8%] h-[10%] w-[6%] opacity-40"
        style={{
          '--depth': -12,
          backgroundImage: 'radial-gradient(var(--color-muted) 1px, transparent 1px)',
          backgroundSize: '7px 7px',
        }}
      />

      {/* зигзаг снизу справа */}
      <span className="parallax absolute right-[2%] bottom-[6%] w-[8%]" style={{ '--depth': 20 }}>
        <svg className="w-full animate-wave text-accent" viewBox="0 0 48 22" fill="none" aria-hidden>
          <path d="M1 8l7-6 8 6 8-6 8 6 8-6 7 6M1 20l7-6 8 6 8-6 8 6 8-6 7 6" stroke="currentColor" strokeWidth="2" />
        </svg>
      </span>
    </div>
  )
}
