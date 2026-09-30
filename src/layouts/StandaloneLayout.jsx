import { Outlet, ScrollRestoration } from 'react-router-dom'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'

export function StandaloneLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  )
}