import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { useAuth } from '@/hooks/useAuth'

/**
 * Пускает дальше только авторизованных. roles — ограничение по роли (например, история покупок — только заказчику).
 * Гостя отправляет на вход и запоминает, куда он шёл; после выхода из аккаунта — на главную.
 */
export function ProtectedRoute({ roles }) {
  const { user, loggedOut } = useAuth()
  const location = useLocation()

  if (!user) {
    return loggedOut ? (
      <Navigate to={ROUTES.home} replace />
    ) : (
      <Navigate to={ROUTES.login} replace state={{ from: location }} />
    )
  }
  if (roles && !roles.includes(user.role)) return <Navigate to={ROUTES.account} replace />
  return <Outlet />
}
