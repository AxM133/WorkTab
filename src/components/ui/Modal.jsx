import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { CloseIcon } from '@/components/icons'
import { useEscapeKey } from '@/hooks/useEscapeKey'
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll'
import { cn } from '@/lib/cn'

const SIZES = {
  md: 'sm:max-w-2xl',
  lg: 'sm:max-w-4xl',
  xl: 'sm:max-w-[1200px]',
}

const FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'

/**
 * Модальное окно поверх страницы: тёмный оверлей, закрытие по крестику, клику на оверлей и Esc.
 * На мобильных — на весь экран. После закрытия фокус возвращается туда, где был.
 * tall — окно на всю доступную высоту (длинные документы).
 */
export function Modal({ open, onClose, title, children, footer, size = 'xl', tall = false, bodyClassName, bodyRef }) {
  const titleId = useId()
  const panelRef = useRef(null)
  // окно остаётся в DOM, пока проигрывается анимация закрытия
  const [isRendered, setIsRendered] = useState(open)
  if (open && !isRendered) setIsRendered(true)

  useLockBodyScroll(isRendered)
  useEscapeKey(onClose, open)

  useEffect(() => {
    if (!open) return
    const previous = document.activeElement
    panelRef.current?.focus()
    return () => previous?.focus?.()
  }, [open])

  // Tab не выходит за пределы окна
  const trapFocus = (event) => {
    if (event.key !== 'Tab') return
    const items = [...panelRef.current.querySelectorAll(FOCUSABLE)]
    if (!items.length) return
    const first = items[0]
    const last = items[items.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  if (!isRendered) return null

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center sm:p-6">
      <div
        aria-hidden
        onClick={onClose}
        className={cn(
          'absolute inset-0 bg-ink/60 backdrop-blur-sm transition-opacity duration-300 starting:opacity-0',
          open ? 'opacity-100' : 'opacity-0',
        )}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onKeyDown={trapFocus}
        onTransitionEnd={(event) => {
          if (!open && event.target === event.currentTarget) setIsRendered(false)
        }}
        className={cn(
          'relative flex h-full w-full flex-col overflow-hidden bg-white shadow-card outline-none sm:max-h-full sm:rounded-3xl',
          'transition-[opacity,translate] duration-300 ease-out-expo starting:translate-y-8 starting:opacity-0',
          open ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0',
          tall ? 'sm:h-full' : 'sm:h-auto',
          SIZES[size],
        )}
      >
        <header className="relative shrink-0 px-14 pt-8 pb-5 text-center md:pt-10">
          <h2 id={titleId} className="text-xl font-bold md:text-[28px]">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Закрыть"
            className="absolute top-3 right-3 flex size-11 items-center justify-center rounded-full text-violet transition-[background-color,rotate] duration-300 hover:rotate-90 hover:bg-lavender md:top-5 md:right-5"
          >
            <CloseIcon className="size-6" />
          </button>
        </header>

        <div ref={bodyRef} className={cn('scrollbar-thin min-h-0 flex-1 overflow-y-auto', bodyClassName)}>
          {children}
        </div>

        {footer && (
          <footer className="flex shrink-0 flex-col-reverse justify-center gap-3 px-6 py-5 sm:flex-row sm:gap-8 md:pb-8">
            {footer}
          </footer>
        )}
      </div>
    </div>,
    document.body,
  )
}
