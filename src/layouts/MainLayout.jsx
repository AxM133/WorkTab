import { Outlet, ScrollRestoration } from 'react-router-dom'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { InfoModalHost } from '@/components/info/InfoModalHost'

export function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <InfoModalHost />
      <ScrollRestoration />
    </div>
  )
}
