import { Avatar, Button } from '@/components/ui'
import { ROUTES } from '@/constants/routes'

export function WorkPreviewCard({ work }) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-line bg-white p-5 transition-[translate,box-shadow,border-color] duration-300 ease-out-expo hover:-translate-y-1.5 hover:border-transparent hover:shadow-card md:p-6">
      <header className="flex items-center gap-4">
        <Avatar src={work.author.avatar} alt={work.author.name} size={36} imageClassName="group-hover:scale-110" />
        <h3 className="line-clamp-2 text-sm leading-snug font-semibold transition-colors group-hover:text-primary md:text-[15px]">
          {work.title}
        </h3>
      </header>

      <p className="mt-4 mb-5 line-clamp-5 flex-1 text-xs leading-relaxed text-body">{work.description}</p>

      <Button
        to={ROUTES.work(work.id)}
        variant="outline"
        size="sm"
        fullWidth
        className="group-hover:bg-primary group-hover:text-white"
      >
        Посмотреть
      </Button>
    </article>
  )
}
