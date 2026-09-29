import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/cn'

const HIDDEN = {
  up: 'translate-y-8 opacity-0',
  left: '-translate-x-10 opacity-0',
  right: 'translate-x-10 opacity-0',
  zoom: 'scale-95 opacity-0',
  fade: 'opacity-0',
}

/**
 * Плавно показывает содержимое при появлении в зоне видимости.
 * delay — задержка в мс (для каскада в сетках). Дочерние элементы могут реагировать на показ
 * через group-data-[inview=true]/reveal:*
 */
export function Reveal({ as: Tag = 'div', variant = 'up', delay = 0, className, style, children, ...rest }) {
  const [ref, inView] = useInView()

  return (
    <Tag
      ref={ref}
      data-inview={inView}
      className={cn(
        'group/reveal transition-[opacity,translate,scale] duration-700 ease-out-expo',
        !inView && HIDDEN[variant],
        className,
      )}
      style={{ transitionDelay: `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
