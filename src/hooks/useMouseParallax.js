import { useEffect } from 'react'

/**
 * Пишет в CSS-переменные --mx / --my элемента положение курсора относительно центра экрана (от -1 до 1).
 * Дочерние элементы с классом `parallax` смещаются на эти значения. Работает только на устройствах с мышью.
 */
export function useMouseParallax(ref) {
  useEffect(() => {
    const node = ref.current
    const canHover = window.matchMedia('(pointer: fine)').matches
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!node || !canHover || reducedMotion) return

    let frame = 0
    const handler = (event) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const x = (event.clientX / window.innerWidth) * 2 - 1
        const y = (event.clientY / window.innerHeight) * 2 - 1
        node.style.setProperty('--mx', x.toFixed(3))
        node.style.setProperty('--my', y.toFixed(3))
      })
    }

    window.addEventListener('pointermove', handler, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', handler)
    }
  }, [ref])
}
