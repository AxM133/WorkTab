import { useEffect } from 'react'

/** Вызывает handler при клике вне элемента ref (для выпадающих меню) */
export function useClickOutside(ref, handler, enabled = true) {
  useEffect(() => {
    if (!enabled) return
    const listener = (event) => {
      if (ref.current && !ref.current.contains(event.target)) handler()
    }
    document.addEventListener('pointerdown', listener)
    return () => document.removeEventListener('pointerdown', listener)
  }, [ref, handler, enabled])
}
