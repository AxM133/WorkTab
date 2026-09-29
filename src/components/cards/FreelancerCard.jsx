import { Link } from 'react-router-dom'
import { Avatar, Button, Rating } from '@/components/ui'
import { ROUTES } from '@/constants/routes'

/** animateRating — звёзды появляются по очереди, когда карточка внутри <Reveal> попадает в зону видимости */
export function FreelancerCard({ freelancer, animateRating = false }) {
  const { id, name, avatar, specialization, completedProjects, rating, isOnline } = freelancer

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-line bg-white p-5 transition-[translate,box-shadow,border-color] duration-300 ease-out-expo hover:-translate-y-1.5 hover:border-transparent hover:shadow-card md:p-6">
      <div className="mb-5 flex flex-1 items-center gap-5 md:gap-7">
        <Avatar
          src={avatar}
          alt={name}
          size={96}
          status={isOnline ? 'online' : 'offline'}
          className="rounded-full ring-4 ring-transparent ring-offset-2 transition-[box-shadow] duration-300 group-hover:ring-peach md:size-28!"
          imageClassName="group-hover:scale-105"
        />

        <div className="min-w-0">
          <h3 className="truncate text-sm font-medium">
            <Link to={ROUTES.profile(id)} className="transition-colors hover:text-primary">
              {name}
            </Link>
          </h3>
          <p className="mt-1.5 text-sm font-semibold text-accent md:text-base">{specialization}</p>
          <p className="mt-1.5 text-xs text-body">Выполнено проектов: {completedProjects}</p>
          <Rating value={rating} animate={animateRating ? 'reveal' : undefined} delay={300} className="mt-2" />
        </div>
      </div>

      <Button
        to={ROUTES.chat}
        variant="outline"
        size="sm"
        fullWidth
        className="group-hover:bg-primary group-hover:text-white"
      >
        Написать
      </Button>
    </article>
  )
}
