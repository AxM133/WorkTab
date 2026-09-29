import { Button, Container } from '@/components/ui'
import { ROUTES } from '@/constants/routes'

export function NotFoundPage() {
  return (
    <Container className="flex min-h-[50vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-7xl font-extrabold text-primary">404</p>
      <h1 className="mt-4 text-2xl font-bold">Страница не найдена</h1>
      <Button to={ROUTES.home} className="mt-8">
        На главную
      </Button>
    </Container>
  )
}
