import { use } from 'react'
import { AuthContext } from '@/context/auth-context'

export function useAuth() {
  const context = use(AuthContext)
  if (!context) throw new Error('useAuth нужно вызывать внутри <AuthProvider>')
  return context
}
