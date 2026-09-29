import { Button, Container } from '@/components/ui'
import { ROUTES } from '@/constants/routes'

/** Временная заглушка для ещё не свёрстанных страниц */
export function PlaceholderPage({ title }) {
  return (
    <Container className="flex min-h-[50vh] flex-col items-center justify-center py-20 text-center">
      <h1 className="text-2xl font-bold md:text-3xl">{title}</h1>
      <p className="mt-3 text-sm text-body">Страница в разработке</p>
      <Button to={ROUTES.home} className="mt-8">
        На главную
      </Button>
    </Container>
  )
}
