import { Outlet, ScrollRestoration } from 'react-router-dom'
import { InfoModalHost } from '@/components/info/InfoModalHost'
import { Logo } from '@/components/layout/Logo'
import { Avatar, Rating } from '@/components/ui'
import { IMAGES } from '@/constants/images'

/** Экраны входа / регистрации: слева форма, справа фото с плашкой-отзывом (на планшете и мобильных фото скрыто) */
export function AuthLayout() {
  return (
    <div className="grid min-h-screen bg-white lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
      <div className="flex flex-col px-4 py-6 sm:px-10 lg:px-16">
        <Logo className="animate-fade-up" />
        <main className="flex flex-1 justify-center py-10 md:py-14">
          <div className="w-full max-w-[520px]">
            <Outlet />
          </div>
        </main>
        <p className="text-center text-xs text-muted">© WorkTap — Worktap.KZ. All Rights Reserved</p>
      </div>

      <aside className="relative hidden overflow-hidden bg-peach-light lg:sticky lg:top-0 lg:block lg:h-screen">
        <img
          src={IMAGES.authFreelancer}
          alt="Фрилансер за ноутбуком"
          className="size-full animate-drift object-cover object-top"
        />
        <div className="absolute inset-0 bg-linear-to-t from-ink/60 via-transparent to-transparent" />

        <span className="absolute top-10 right-10 size-24 animate-float-slow rounded-full bg-accent/80 backdrop-blur-sm" />
        <span className="absolute top-40 right-40 size-10 animate-float rounded-full bg-white/70 [animation-delay:-2s]" />

        <figure className="absolute inset-x-10 bottom-10 animate-fade-up rounded-3xl bg-white p-6 shadow-card [animation-delay:300ms] xl:inset-x-14">
          <Rating value={5} size="sm" animate="mount" delay={700} />
          <blockquote className="mt-4 text-sm leading-relaxed text-body">
            «Нашла дизайнера за один день — сайт был готов уже через неделю. Удобно, что деньги переводятся исполнителю
            только после того, как я приняла работу.»
          </blockquote>
          <figcaption className="mt-5 flex items-center gap-3">
            <Avatar src="https://randomuser.me/api/portraits/women/29.jpg" name="Алия Нурланова" size={44} />
            <div>
              <p className="text-sm font-semibold">Алия Нурланова</p>
              <p className="text-xs text-muted">Владелица интернет-магазина</p>
            </div>
          </figcaption>
        </figure>
      </aside>
      <InfoModalHost />
      <ScrollRestoration />
    </div>
  )
}
