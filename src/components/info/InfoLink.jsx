import { Link, useLocation } from 'react-router-dom'
import { INFO_PARAM } from '@/hooks/useInfoModal'

/** Ссылка, открывающая информационное окно поверх текущей страницы (doc: about, how-it-works, rules…) */
export function InfoLink({ doc, className, children }) {
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  params.set(INFO_PARAM, doc)

  return (
    <Link
      to={{ pathname: location.pathname, search: `?${params}` }}
      state={{ infoOpened: true }}
      preventScrollReset
      className={className}
    >
      {children}
    </Link>
  )
}
