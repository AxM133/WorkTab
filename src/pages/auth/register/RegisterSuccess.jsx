import { CheckIcon } from '@/components/icons'
import { Button } from '@/components/ui'
import { ROLES } from '@/constants/profile'
import { ROUTES } from '@/constants/routes'

/** Финальный экран регистрации «Поздравляем!» */
export function RegisterSuccess({ user }) {
  const isFreelancer = user.role === ROLES.freelancer

  return (
    <div className="text-center">
      <div className="relative mx-auto size-40">
        <span className="absolute inset-0 animate-scale-in rounded-full bg-mint" />
        <span className="absolute top-2 -left-2 size-6 animate-float rounded-full bg-peach" />
        <span className="absolute -right-3 bottom-6 size-4 animate-float-slow rounded-full bg-accent" />
        <span className="absolute inset-8 flex animate-pop items-center justify-center rounded-full bg-primary text-white shadow-glow-primary [animation-delay:250ms]">
          <CheckIcon className="size-12" />
        </span>
      </div>

      <h1 className="mt-8 animate-fade-up text-3xl font-bold [animation-delay:350ms]">
        Поздравляем, <span className="text-primary">{user.firstName}</span>!
      </h1>
      <p className="mx-auto mt-4 max-w-sm animate-fade-up text-sm text-body [animation-delay:450ms] md:text-base">
        {isFreelancer
          ? 'Ваш профиль фрилансера готов. Добавьте первый ворк, чтобы заказчики могли вас найти.'
          : 'Аккаунт создан. Найдите исполнителя в каталоге ворков или опубликуйте свой заказ.'}
      </p>

      <div className="mt-10 flex animate-fade-up flex-col justify-center gap-3 [animation-delay:550ms] sm:flex-row">
        <Button to={ROUTES.account} size="lg">
          Перейти в профиль
        </Button>
        <Button to={isFreelancer ? ROUTES.createWork : ROUTES.works} variant="secondary" size="lg">
          {isFreelancer ? 'Создать ворк' : 'Найти исполнителя'}
        </Button>
      </div>
    </div>
  )
}
