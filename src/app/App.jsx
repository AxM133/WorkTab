import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from '@/context/AuthProvider'
import { FavoritesProvider } from '@/context/FavoritesProvider'
import { router } from './router'

export function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <RouterProvider router={router} />
      </FavoritesProvider>
    </AuthProvider>
  )
}
