import { Link } from 'react-router-dom'
import { Container } from '@/components/ui'
import { ROLE_LABELS, ROLES } from '@/constants/profile'
import { ROUTES } from '@/constants/routes'
import { getFullName } from '@/lib/format'
import { getAverageRating } from '@/services/dataService'
import { ProfileDetails } from './ProfileDetails'
import { ProfileVisual } from './ProfileVisual'

export function ProfileHero({ user, isOwner }) {
  const isFreelancer = user.role === ROLES.freelancer
  const profile = user.profile ?? {}
  const skills = profile.skills ?? []

  return (
    <section className="overflow-hidden bg-surface pt-8 pb-20 md:pt-12 md:pb-28">
      <Container className="grid items-center gap-16 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-10">
        <div>
          <p className="animate-fade-up text-lg font-semibold text-accent">
            {profile.specialization || ROLE_LABELS[user.role]}
          </p>
          <h1 className="mt-2 animate-fade-up text-3xl font-bold [animation-delay:80ms] md:text-[40px]">
            <span className="text-primary">{user.firstName}</span> {user.lastName}
          </h1>

          {profile.about ? (
            <p className="mt-5 max-w-[560px] animate-fade-up text-sm leading-relaxed whitespace-pre-line [animation-delay:160ms]">
              {profile.about}
            </p>
          ) : (
            isOwner && (
              <p className="mt-5 animate-fade-up text-sm text-muted [animation-delay:160ms]">
                Расскажите о себе —{' '}
                <Link to={ROUTES.accountEdit} className="font-medium text-primary hover:underline">
                  заполнить профиль
                </Link>
              </p>
            )
          )}

          {skills.length > 0 && (
            <ul className="mt-7 flex max-w-[600px] flex-wrap gap-3">
              {skills.map((skill, index) => (
                <li
                  key={skill}
                  className="animate-chip-in rounded-full bg-white px-5 py-2 text-xs shadow-[0_4px_14px_-6px_rgb(28_28_40/0.12)] transition-[translate,color] hover:-translate-y-0.5 hover:text-primary"
                  style={{ animationDelay: `${250 + index * 50}ms` }}
                >
                  {skill}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-10 animate-fade-up [animation-delay:350ms]">
            <ProfileDetails user={user} />
          </div>
        </div>

        <ProfileVisual
          name={getFullName(user)}
          avatar={user.avatar}
          isOnline={isOwner || user.isOnline}
          rating={isFreelancer ? getAverageRating(user.id) : 0}
          showRating={isFreelancer}
          isOwner={isOwner}
        />
      </Container>
    </section>
  )
}
