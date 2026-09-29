import { useMemo } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { useAuth } from '@/hooks/useAuth'
import { getUserById } from '@/services/authService'
import { NotFoundPage } from '../not-found/NotFoundPage'
import { ProfileView } from './ProfileView'

/** Публичный профиль пользователя /profile/:id */
export function UserProfilePage() {
  const { id } = useParams()
  const { user: currentUser } = useAuth()
  const profileUser = useMemo(() => getUserById(id), [id])

  if (currentUser?.id === id) return <Navigate to={ROUTES.account} replace />
  if (!profileUser) return <NotFoundPage />

  return <ProfileView key={id} user={profileUser} isOwner={false} />
}
