import { useState } from 'react'
import { Button, Modal } from '@/components/ui'
import { ROUTES } from '@/constants/routes'
import { useAuth } from '@/hooks/useAuth'
import { deleteWork } from '@/services/dataService'
import { cn } from '@/lib/cn'

export function WorkOwnerActions({ work, onDeleted, className }) {
  const { user } = useAuth()
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  if (user?.id !== work.authorId) return null

  const handleDelete = () => {
    if (!deleteWork(work.id, user.id)) return
    setIsConfirmOpen(false)
    onDeleted?.()
  }

  return (
    <>
      <div className={cn('grid grid-cols-2 gap-2', className)}>
        <Button to={ROUTES.editWork(work.id)} variant="outline" size="sm" fullWidth>
          Редактировать
        </Button>
        <Button
          variant="outline"
          size="sm"
          fullWidth
          className="border-danger text-danger hover:bg-danger hover:text-white"
          onClick={() => setIsConfirmOpen(true)}
        >
          Удалить
        </Button>
      </div>

      <Modal
        open={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        title="Удалить ворк?"
        size="md"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsConfirmOpen(false)}>
              Оставить ворк
            </Button>
            <Button
              variant="outline"
              className="border-danger text-danger hover:bg-danger hover:text-white"
              onClick={handleDelete}
            >
              Удалить
            </Button>
          </>
        }
      >
        <p className="px-6 pb-8 text-center text-sm leading-6 text-body">
          «{work.title}» будет удалён из каталога и вашего профиля. Это действие нельзя отменить.
        </p>
      </Modal>
    </>
  )
}