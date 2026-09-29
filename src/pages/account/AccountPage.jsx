import { useAuth } from '@/hooks/useAuth'
import { ProfileView } from '../profile/ProfileView'

/** Личный кабинет — собственный профиль */
export function AccountPage() {
  const { user } = useAuth()
  return <ProfileView user={user} isOwner />
}
