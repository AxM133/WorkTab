import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { SettingsIcon } from '@/components/icons'
import { Rating } from '@/components/ui'
import { ROUTES } from '@/constants/routes'
import { useMouseParallax } from '@/hooks/useMouseParallax'
import { getInitials } from '@/lib/format'

/** Круглое фото профиля с декоративными кругами, статусом «В сети» и плашкой рейтинга */
export function ProfileVisual({ name, avatar, isOnline, rating, showRating, isOwner }) {
  const ref = useRef(null)
  useMouseParallax(ref)

  return (
    <div ref={ref} className="relative mx-auto aspect-square w-full max-w-[280px] sm:max-w-[380px] lg:max-w-[420px]">
      {/* персиковый круг сверху слева */}
      <span className="parallax absolute top-[-8%] left-[6%] size-[22%]" style={{ '--depth': 26 }}>
        <span className="block size-full animate-scale-in rounded-full bg-peach-light [animation-delay:400ms]" />
      </span>
      {/* большой персиковый круг справа снизу, под фото */}
      <span className="parallax absolute right-[-10%] bottom-[2%] size-[42%]" style={{ '--depth': -14 }}>
        <span className="block size-full animate-scale-in rounded-full bg-peach-light [animation-delay:300ms]" />
      </span>

      {/* фото */}
      <div className="parallax absolute inset-[6%]" style={{ '--depth': 6 }}>
        <div className="size-full animate-scale-in overflow-hidden rounded-full bg-ink shadow-card">
          {avatar ? (
            <img src={avatar} alt={name} className="size-full object-cover" />
          ) : (
            <span className="flex size-full items-center justify-center bg-linear-to-br from-primary to-[#12a4a0] text-7xl font-bold text-white">
              {getInitials(name)}
            </span>
          )}
        </div>
      </div>

      {/* зигзаг справа сверху */}
      <span className="parallax absolute top-[14%] right-[-8%] w-[18%]" style={{ '--depth': 30 }}>
        <svg className="w-full animate-wave text-accent" viewBox="0 0 48 22" fill="none" aria-hidden>
          <path d="M1 8l7-6 8 6 8-6 8 6 8-6 7 6M1 20l7-6 8 6 8-6 8 6 8-6 7 6" stroke="currentColor" strokeWidth="2" />
        </svg>
      </span>

      {/* точки слева снизу */}
      <span
        className="parallax absolute bottom-[20%] left-[-4%] h-[10%] w-[16%]"
        style={{
          '--depth': -20,
          backgroundImage: 'radial-gradient(var(--color-accent) 1.6px, transparent 1.6px)',
          backgroundSize: '8px 8px',
        }}
      />

      {/* статус */}
      <div className="parallax absolute top-[34%] left-[-12%]" style={{ '--depth': 22 }}>
        <div className="animate-float-slow">
          <span className="flex animate-pop items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-medium shadow-soft [animation-delay:600ms]">
            <span className={isOnline ? 'size-2 rounded-full bg-primary' : 'size-2 rounded-full bg-lilac'} />
            <span className={isOnline ? 'text-primary' : 'text-muted'}>{isOnline ? 'В сети' : 'Был(а) недавно'}</span>
          </span>
        </div>
      </div>

      {/* настройки — только владельцу */}
      {isOwner && (
        <Link
          to={ROUTES.accountEdit}
          aria-label="Настройки профиля"
          className="absolute top-[4%] right-[4%] flex size-10 animate-pop items-center justify-center rounded-xl bg-white text-violet shadow-soft transition-[color,rotate] duration-500 [animation-delay:700ms] hover:rotate-90 hover:text-primary"
        >
          <SettingsIcon className="size-5" />
        </Link>
      )}

      {/* рейтинг */}
      {showRating && (
        <div className="parallax absolute inset-x-0 bottom-[-2%] flex justify-center" style={{ '--depth': 16 }}>
          <div className="animate-pop rounded-2xl bg-white px-5 py-3 shadow-card [animation-delay:800ms]">
            {rating > 0 ? (
              <Rating value={rating} size="lg" animate="mount" delay={950} />
            ) : (
              <span className="text-xs font-semibold text-accent">Новичок на WorkTap</span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
