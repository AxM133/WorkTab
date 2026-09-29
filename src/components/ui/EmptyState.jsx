import { cn } from '@/lib/cn'

/** Заглушка для пустых списков: иконка в круге, заголовок, текст и действие */
export function EmptyState({ icon: Icon, title, text, action, className }) {
  return (
    <div
      className={cn(
        'flex animate-fade-up flex-col items-center rounded-3xl border border-dashed border-lavender-dark bg-white px-6 py-14 text-center',
        className,
      )}
    >
      {Icon && (
        <span className="relative mb-5 flex size-20 items-center justify-center">
          <span className="absolute inset-0 animate-float-slow rounded-full bg-lavender" />
          <Icon className="relative size-9 text-primary" />
        </span>
      )}
      <h3 className="text-lg font-semibold">{title}</h3>
      {text && <p className="mt-2 max-w-sm text-sm text-body">{text}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}
