import { useMemo, useState } from 'react'
import * as authService from '@/services/authService'
import { AuthContext } from './auth-context'

export function AuthProvider({ children }) {
  // loggedOut — пользователь сам вышел: защищённые страницы тогда ведут на главную, а не на форму входа
  const [session, setSession] = useState(() => ({ user: authService.getSessionUser(), loggedOut: false }))
  const { user, loggedOut } = session

  const value = useMemo(
    () => ({
      user,
      loggedOut,
      isAuthenticated: Boolean(user),

      async login(credentials) {
        const loggedIn = await authService.login(credentials)
        setSession({ user: loggedIn, loggedOut: false })
        return loggedIn
      },

      async register(data) {
        const created = await authService.register(data)
        setSession({ user: created, loggedOut: false })
        return created
      },

      async updateProfile(patch) {
        const updated = await authService.updateProfile(user.id, patch)
        setSession({ user: updated, loggedOut: false })
        return updated
      },

      logout() {
        authService.logout()
        setSession({ user: null, loggedOut: true })
      },
    }),
    [user, loggedOut],
  )

  return <AuthContext value={value}>{children}</AuthContext>
}
