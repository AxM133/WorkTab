import { QuickSearchTab } from '@/components/layout/QuickSearchTab'
import { ROLES } from '@/constants/profile'
import { ClientActivity } from './ClientActivity'
import { ProfileHero } from './ProfileHero'
import { ProfileReviews } from './ProfileReviews'
import { ProfileWorks } from './ProfileWorks'

/**
 * Страница профиля. У фрилансера — ворки и отзывы (по макету ЛК),
 * у заказчика (только владельцу) — история покупок и заказы.
 */
export function ProfileView({ user, isOwner }) {
  const isFreelancer = user.role === ROLES.freelancer

  return (
    <>
      <QuickSearchTab />
      <ProfileHero user={user} isOwner={isOwner} />
      <div className="bg-surface-soft">
        {isFreelancer ? (
          <>
            <ProfileWorks user={user} isOwner={isOwner} />
            <ProfileReviews user={user} isOwner={isOwner} />
          </>
        ) : (
          isOwner && <ClientActivity user={user} />
        )}
      </div>
    </>
  )
}
