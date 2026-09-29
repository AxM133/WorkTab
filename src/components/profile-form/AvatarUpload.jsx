import { useId, useState } from 'react'
import { CameraIcon, TrashIcon } from '@/components/icons'
import { Avatar } from '@/components/ui'
import { resizeImageFile } from '@/lib/image'

const MAX_SIZE_MB = 5

export function AvatarUpload({ value, name, onChange }) {
  const inputId = useId()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleFile = async (event) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('Выберите изображение (JPG, PNG, WEBP)')
      return
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`Файл больше ${MAX_SIZE_MB} МБ`)
      return
    }

    setError('')
    setIsLoading(true)
    try {
      onChange(await resizeImageFile(file))
    } catch {
      setError('Не удалось загрузить фото, попробуйте другое')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-5">
      <label htmlFor={inputId} className="group relative cursor-pointer rounded-full" aria-label="Загрузить фото">
        <Avatar src={value} name={name || 'W T'} size={88} />
        <span className="absolute inset-0 flex items-center justify-center rounded-full bg-ink/50 text-white opacity-0 transition-opacity group-hover:opacity-100">
          <CameraIcon className="size-7" />
        </span>
        {isLoading && (
          <span className="absolute inset-0 flex items-center justify-center rounded-full bg-white/70">
            <span className="size-6 animate-spin rounded-full border-2 border-primary border-r-transparent" />
          </span>
        )}
      </label>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium">Фото профиля</p>
        <div className="flex flex-wrap gap-2">
          <label
            htmlFor={inputId}
            className="flex h-9 cursor-pointer items-center gap-2 rounded-full bg-lavender px-4 text-xs font-semibold text-primary transition-colors hover:bg-lavender-dark"
          >
            <CameraIcon className="size-4" />
            {value ? 'Заменить' : 'Загрузить фото'}
          </label>
          {value && (
            <button
              type="button"
              onClick={() => onChange(null)}
              className="flex h-9 items-center gap-2 rounded-full px-3 text-xs font-medium text-muted transition-colors hover:bg-danger/10 hover:text-danger"
            >
              <TrashIcon className="size-4" />
              Удалить
            </button>
          )}
        </div>
        {error ? (
          <p className="text-xs text-danger" role="alert">
            {error}
          </p>
        ) : (
          <p className="text-xs text-muted">JPG или PNG до {MAX_SIZE_MB} МБ. Профили с фото получают больше заказов</p>
        )}
      </div>

      <input id={inputId} type="file" accept="image/*" className="sr-only" onChange={handleFile} />
    </div>
  )
}
