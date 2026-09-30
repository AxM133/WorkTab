import { useId, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import defaultCover from '@/assets/images/works/desk.jpg'
import { Button, Container, Input, PageHeading, Select, Stepper, Textarea } from '@/components/ui'
import { CATEGORIES } from '@/data/mock/categories'
import { ROUTES } from '@/constants/routes'
import { useAuth } from '@/hooks/useAuth'
import { formatPrice } from '@/lib/format'
import { resizeCoverImageFile } from '@/lib/image'
import { createWork, getWork, updateWork } from '@/services/dataService'

const STEPS = ['Основное', 'Описание', 'Цена и сроки', 'Обложка']
const MAX_COVER_SIZE = 5 * 1024 * 1024

function getStepErrors(step, values) {
  const errors = {}
  if (step === 0) {
    if (!values.categoryId) errors.categoryId = 'Выберите категорию'
    if (!values.subcategory) errors.subcategory = 'Выберите направление'
    if (values.title.trim().length < 6) errors.title = 'Название должно быть не короче 6 символов'
  }
  if (step === 1 && values.description.trim().length < 40) {
    errors.description = 'Опишите услугу подробнее — минимум 40 символов'
  }
  if (step === 2) {
    if (!Number.isFinite(Number(values.price)) || Number(values.price) < 1000) {
      errors.price = 'Минимальная стоимость — 1 000 тенге'
    }
    if (!Number.isInteger(Number(values.deliveryDays)) || Number(values.deliveryDays) < 1 || Number(values.deliveryDays) > 90) {
      errors.deliveryDays = 'Укажите срок от 1 до 90 дней'
    }
  }
  return errors
}

export function CreateWorkPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { id: workId } = useParams()
  const existingWork = workId ? getWork(workId) : null
  const isEditing = Boolean(workId)
  const fileInputId = useId()
  const [step, setStep] = useState(0)
  const [isLoadingCover, setIsLoadingCover] = useState(false)
  const [coverError, setCoverError] = useState('')
  const [errors, setErrors] = useState({})
  const [values, setValues] = useState(() => {
    const categoryId = existingWork?.categoryId ?? existingWork?.author?.profile?.categoryId ?? user.profile?.categoryId ?? ''
    const category = CATEGORIES.find((item) => item.id === categoryId)
    return {
      categoryId,
      subcategory: existingWork?.subcategory ?? category?.subcategories[0] ?? '',
      title: existingWork?.title ?? '',
      description:
        existingWork?.description ??
        (existingWork ? `${existingWork.title}. Обсудите детали услуги напрямую с исполнителем.` : ''),
      price: existingWork ? String(existingWork.price) : '',
      deliveryDays: String(existingWork?.deliveryDays ?? 3),
      cover: existingWork?.cover ?? '',
    }
  })

  const selectedCategory = CATEGORIES.find((category) => category.id === values.categoryId)

  const updateField = (name, value) => {
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: undefined }))
  }

  const handleCoverChange = async (event) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setCoverError('Выберите изображение в формате JPG, PNG или WEBP')
      return
    }
    if (file.size > MAX_COVER_SIZE) {
      setCoverError('Размер файла не должен превышать 5 МБ')
      return
    }

    setCoverError('')
    setIsLoadingCover(true)
    try {
      updateField('cover', await resizeCoverImageFile(file))
    } catch {
      setCoverError('Не удалось обработать изображение. Попробуйте другой файл.')
    } finally {
      setIsLoadingCover(false)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const stepErrors = getStepErrors(step, values)
    setErrors(stepErrors)
    if (Object.keys(stepErrors).length) return

    if (step < STEPS.length - 1) {
      setStep((current) => current + 1)
      return
    }

    const workValues = {
      categoryId: values.categoryId,
      subcategory: values.subcategory,
      title: values.title.trim(),
      description: values.description.trim(),
      price: Number(values.price),
      deliveryDays: Number(values.deliveryDays),
      cover: values.cover || defaultCover,
    }
    const work = isEditing ? updateWork(workId, workValues, user.id) : createWork(workValues, user.id)
    if (!work) return
    navigate(ROUTES.work(work.id))
  }

  if (isEditing && (!existingWork || existingWork.authorId !== user.id)) {
    return <Navigate to={existingWork ? ROUTES.work(workId) : ROUTES.works} replace />
  }

  return (
    <main className="min-h-screen">
      <Container className="max-w-5xl pb-14 pt-9 md:pb-16 md:pt-12">
        <PageHeading>{isEditing ? 'Редактирование' : 'Создание'} <span className="text-accent">ворка</span></PageHeading>
        <Stepper steps={STEPS} current={step} className="mx-auto mt-8 max-w-3xl" />

        <section className="mt-8 rounded-2xl border border-line bg-white p-5 shadow-soft md:p-9">
          <form onSubmit={handleSubmit} noValidate>
            <div className="min-h-[340px]">
              {step === 0 && (
                <div className="grid gap-5 md:grid-cols-2">
                  <Select
                    label="Категория"
                    required
                    value={values.categoryId}
                    error={errors.categoryId}
                    placeholder="Выберите категорию"
                    options={CATEGORIES.map(({ id, title }) => ({ value: id, label: title }))}
                    onChange={(event) => {
                      updateField('categoryId', event.target.value)
                      updateField('subcategory', '')
                    }}
                  />
                  <Select
                    label="Направление"
                    required
                    value={values.subcategory}
                    error={errors.subcategory}
                    placeholder={selectedCategory ? 'Выберите направление' : 'Сначала выберите категорию'}
                    options={(selectedCategory?.subcategories ?? []).map((title) => ({ value: title, label: title }))}
                    disabled={!selectedCategory}
                    onChange={(event) => updateField('subcategory', event.target.value)}
                  />
                  <Input
                    label="Название ворка"
                    required
                    maxLength={80}
                    placeholder="Например, разработаю дизайн сайта в Figma"
                    value={values.title}
                    error={errors.title}
                    className="md:col-span-2"
                    onChange={(event) => updateField('title', event.target.value)}
                  />
                </div>
              )}

              {step === 1 && (
                <div className="max-w-3xl">
                  <h2 className="text-lg font-semibold">Расскажите об услуге</h2>
                  <p className="mt-1 text-sm text-muted">Опишите, что получит заказчик и какие материалы нужны для начала.</p>
                  <Textarea
                    label="Описание"
                    required
                    maxLength={1500}
                    value={values.description}
                    error={errors.description}
                    hint="Минимум 40 символов"
                    className="mt-6"
                    onChange={(event) => updateField('description', event.target.value)}
                  />
                </div>
              )}

              {step === 2 && (
                <div className="max-w-2xl">
                  <h2 className="text-lg font-semibold">Укажите стоимость и сроки</h2>
                  <p className="mt-1 text-sm text-muted">Эти условия увидят заказчики в каталоге и на странице ворка.</p>
                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    <Input
                      label="Стоимость, тенге"
                      required
                      type="number"
                      min="1000"
                      step="500"
                      placeholder="25 000"
                      value={values.price}
                      error={errors.price}
                      onChange={(event) => updateField('price', event.target.value)}
                    />
                    <Input
                      label="Срок выполнения, дней"
                      required
                      type="number"
                      min="1"
                      max="90"
                      step="1"
                      value={values.deliveryDays}
                      error={errors.deliveryDays}
                      onChange={(event) => updateField('deliveryDays', event.target.value)}
                    />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="grid gap-7 lg:grid-cols-[minmax(0,1.1fr)_minmax(240px,.9fr)]">
                  <div>
                    <h2 className="text-lg font-semibold">Добавьте обложку</h2>
                    <p className="mt-1 text-sm text-muted">Загрузите изображение до 5 МБ или оставьте обложку по умолчанию.</p>
                    <div className="relative mt-5 aspect-[16/9] overflow-hidden rounded-xl bg-lavender">
                      <img src={values.cover || defaultCover} alt="Предпросмотр обложки ворка" className="size-full object-cover" />
                      {isLoadingCover && (
                        <span className="absolute inset-0 flex items-center justify-center bg-white/75 text-sm font-medium">
                          Обрабатываем изображение…
                        </span>
                      )}
                    </div>
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <label
                        htmlFor={fileInputId}
                        className="inline-flex h-10 cursor-pointer items-center justify-center rounded-full border border-primary px-6 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
                      >
                        Загрузить обложку
                      </label>
                      {values.cover && (
                        <Button variant="secondary" size="sm" onClick={() => updateField('cover', '')}>
                          Использовать стандартную
                        </Button>
                      )}
                      <input
                        id={fileInputId}
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={handleCoverChange}
                      />
                    </div>
                    {coverError && <p className="mt-2 text-xs text-danger" role="alert">{coverError}</p>}
                  </div>

                  <div className="border-t border-line pt-5 lg:border-t-0 lg:border-l lg:pl-7 lg:pt-0">
                    <h2 className="text-lg font-semibold">Проверьте ворк</h2>
                    <dl className="mt-5 space-y-4 text-sm">
                      <div>
                        <dt className="text-muted">Название</dt>
                        <dd className="mt-1 font-medium">{values.title}</dd>
                      </div>
                      <div>
                        <dt className="text-muted">Направление</dt>
                        <dd className="mt-1 font-medium">{values.subcategory}</dd>
                      </div>
                      <div>
                        <dt className="text-muted">Стоимость</dt>
                        <dd className="mt-1 font-semibold text-primary">{formatPrice(Number(values.price))}</dd>
                      </div>
                      <div>
                        <dt className="text-muted">Срок выполнения</dt>
                        <dd className="mt-1 font-medium">{values.deliveryDays} дн.</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 flex flex-col-reverse gap-3 border-t border-line pt-5 sm:flex-row sm:justify-between">
              <Button type="button" variant="outline" disabled={step === 0} onClick={() => setStep((current) => current - 1)}>
                Назад
              </Button>
              <Button type="submit" disabled={isLoadingCover}>
                {step === STEPS.length - 1 ? (isEditing ? 'Сохранить изменения' : 'Опубликовать ворк') : 'Продолжить'}
              </Button>
            </div>
          </form>
        </section>
      </Container>
    </main>
  )
}