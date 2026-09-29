import { useCallback } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

export const INFO_PARAM = 'info'

/**
 * Информационные окна открываются через ?info=<ключ> в адресе:
 * ссылкой можно поделиться, а кнопка «Назад» в браузере закрывает окно.
 */
export function useInfoModal() {
  const [searchParams, setSearchParams] = useSearchParams()
  const location = useLocation()
  const navigate = useNavigate()
  const current = searchParams.get(INFO_PARAM)
  const openedFromSite = Boolean(location.state?.infoOpened)

  const close = useCallback(() => {
    // окно открыли ссылкой на сайте — просто шаг назад по истории
    if (openedFromSite) {
      navigate(-1)
      return
    }
    // пришли сразу по ссылке с ?info — убираем параметр, оставаясь на странице
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        next.delete(INFO_PARAM)
        return next
      },
      { replace: true, preventScrollReset: true },
    )
  }, [openedFromSite, navigate, setSearchParams])

  return { current, close }
}
