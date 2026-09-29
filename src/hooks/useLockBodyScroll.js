import { useEffect } from 'react'

/** Блокирует прокрутку страницы, пока открыто меню / модальное окно */
export function useLockBodyScroll(locked) {
  useEffect(() => {
    if (!locked) return
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = overflow
    }
  }, [locked])
}
