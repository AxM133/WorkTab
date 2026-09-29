import { useEffect, useRef, useState } from 'react'
import { DownloadIcon } from '@/components/icons'
import { Button, Modal } from '@/components/ui'
import { LEGAL_DOCS, legalDocToText } from '@/data/content/legal'
import { cn } from '@/lib/cn'
import { downloadTextFile } from '@/lib/download'

function Block({ block }) {
  if (typeof block === 'string') return <p>{block}</p>
  if (block.list) {
    return (
      <ul className="flex list-disc flex-col gap-1.5 pl-5 marker:text-primary">
        {block.list.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    )
  }
  return (
    <ol start={block.start} className="flex list-decimal flex-col gap-4 pl-6 marker:font-semibold">
      {block.ordered.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ol>
  )
}

/**
 * Длинный документ (правила, политики): оглавление с подсветкой текущего раздела,
 * полоса прогресса чтения и кнопка «Скачать документ».
 */
export function LegalModal({ docKey, open, onClose }) {
  const doc = LEGAL_DOCS[docKey]
  const bodyRef = useRef(null)
  const [activeId, setActiveId] = useState(doc.sections[0].id)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const body = bodyRef.current
    if (!open || !body) return

    const handleScroll = () => {
      const max = body.scrollHeight - body.clientHeight
      setProgress(max > 0 ? body.scrollTop / max : 1)
    }
    handleScroll()
    body.addEventListener('scroll', handleScroll, { passive: true })

    // активный раздел — тот, чей заголовок пересёк верхнюю треть окна
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (visible.length) setActiveId(visible[0].target.id)
      },
      { root: body, rootMargin: '0px 0px -65% 0px' },
    )
    body.querySelectorAll('section[id]').forEach((section) => observer.observe(section))

    return () => {
      body.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [open])

  const scrollTo = (id) => {
    setActiveId(id)
    bodyRef.current?.querySelector(`#${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={doc.title}
      tall
      bodyRef={bodyRef}
      footer={
        <>
          <Button
            variant="outline"
            size="lg"
            onClick={() => downloadTextFile(doc.fileName, legalDocToText(doc))}
            className="w-full sm:w-96"
          >
            Скачать документ
            <DownloadIcon className="size-5" />
          </Button>
          <Button size="lg" onClick={onClose} className="w-full sm:order-first sm:w-96">
            Понятно
          </Button>
        </>
      }
    >
      {/* прогресс чтения */}
      <div className="sticky top-0 z-10 h-1 bg-lavender">
        <div
          className="h-full rounded-r-full bg-primary transition-[width] duration-150"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <div className="grid gap-10 px-6 py-6 md:px-10 lg:grid-cols-[220px_minmax(0,1fr)]">
        <nav aria-label="Содержание" className="hidden lg:block">
          <div className="sticky top-6">
            <p className="mb-3 text-xs font-semibold tracking-wider text-muted uppercase">Содержание</p>
            <ul className="flex flex-col gap-1 border-l-2 border-lavender">
              {doc.sections.map((section) => (
                <li key={section.id}>
                  <button
                    type="button"
                    onClick={() => scrollTo(section.id)}
                    className={cn(
                      '-ml-0.5 border-l-2 py-1.5 pl-4 text-left text-sm transition-colors duration-200',
                      activeId === section.id
                        ? 'border-primary font-semibold text-primary'
                        : 'border-transparent text-body hover:text-ink',
                    )}
                  >
                    {section.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <article className="animate-fade-up text-sm leading-relaxed">
          <h3 className="font-bold uppercase">{doc.heading}</h3>
          <p className="mt-1 text-xs text-muted">Редакция от {doc.updatedAt}</p>

          {doc.sections.map((section) => (
            <section key={section.id} id={section.id} className="mt-8 scroll-mt-4">
              <h4 className="mb-3 font-bold">{section.title}</h4>
              <div className="flex flex-col gap-4">
                {section.blocks.map((block, index) => (
                  <Block key={index} block={block} />
                ))}
              </div>
            </section>
          ))}
        </article>
      </div>
    </Modal>
  )
}
