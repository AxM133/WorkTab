import { useEffect, useState } from 'react'

/** true, когда страница прокручена дальше offset пикселей */
export function useScrolled(offset = 10) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > offset)
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [offset])

  return scrolled
}
