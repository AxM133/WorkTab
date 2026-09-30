import { useEffect, useState } from 'react'
import { getWorks, WORKS_CHANGE_EVENT } from '@/services/dataService'

export function useWorks() {
  const [works, setWorks] = useState(getWorks)

  useEffect(() => {
    const refresh = () => setWorks(getWorks())
    window.addEventListener(WORKS_CHANGE_EVENT, refresh)
    window.addEventListener('storage', refresh)
    return () => {
      window.removeEventListener(WORKS_CHANGE_EVENT, refresh)
      window.removeEventListener('storage', refresh)
    }
  }, [])

  return works
}