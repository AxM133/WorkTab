import { useState } from 'react'
import { AvatarUpload } from '@/components/profile-form/AvatarUpload'
import { DetailsFields } from '@/components/profile-form/DetailsFields'
import { SkillsFields } from '@/components/profile-form/SkillsFields'
import { SpecializationFields } from '@/components/profile-form/SpecializationFields'
import {
  fromUser,
  toProfile,
  validateDetails,
  validateSkills,
  validateSpecialization,
} from '@/components/profile-form/validation'
import { CheckIcon } from '@/components/icons'
import { Button, Container, Input, PageHeading, Select, Textarea } from '@/components/ui'
import { COUNTRIES, ROLES } from '@/constants/profile'
import { ROUTES } from '@/constants/routes'
import { useAuth } from '@/hooks/useAuth'
import { formatPhone } from '../auth/validation'

function Section({ title, children }) {
  return (
    <section className="animate-fade-up rounded-3xl border border-line bg-white p-6 md:p-8">
      <h2 className="mb-6 text-lg font-bold">{title}</h2>
      {children}
    </section>
  )
}

function validate(values, isFreelancer) {
  const errors = {}
  if (!values.firstName.trim()) errors.firstName = 'Введите имя'
  if (!values.lastName.trim()) errors.lastName = 'Введите фамилию'
  if (values.phone.replace(/\D/g, '').length < 10) errors.phone = 'Введите номер телефона полностью'
  if (!isFreelancer) return errors
  return { ...errors, ...validateSpecialization(values), ...validateSkills(values), ...validateDetails(values) }
}

export function EditProfilePage() {
  const { user, updateProfile } = useAuth()
  const isFreelancer = user.role === ROLES.freelancer
  const [values, setValues] = useState(() => ({
    ...fromUser(user),
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone ?? '',
  }))
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | saving | saved

  const setField = (field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
    setStatus('idle')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = validate(values, isFreelancer)
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      // прокручиваем к первому полю с ошибкой
      requestAnimationFrame(() =>
        document
          .querySelector('[aria-invalid="true"], [role="alert"]')
          ?.scrollIntoView({ behavior: 'smooth', block: 'center' }),
      )
      return
    }

    setStatus('saving')
    await updateProfile({
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      phone: values.phone,
      avatar: values.avatar,
      profile: isFreelancer
        ? toProfile(values)
        : { about: values.about.trim(), country: values.country, city: values.city.trim() },
    })
    setStatus('saved')
  }

  const bind = (field) => ({
    value: values[field],
    error: errors[field],
    onChange: (event) => setField(field, event.target.value),
  })

  return (
    <Container className="max-w-[860px] py-10 md:py-14">
      <PageHeading>
        Настройки <span className="text-accent">профиля</span>
      </PageHeading>

      <form onSubmit={handleSubmit} noValidate className="mt-10 flex flex-col gap-6 md:mt-14">
        <Section title="Основная информация">
          <div className="flex flex-col gap-6">
            <AvatarUpload
              value={values.avatar}
              name={`${values.firstName} ${values.lastName}`}
              onChange={(avatar) => setField('avatar', avatar)}
            />
            <div className="grid gap-5 sm:grid-cols-2">
              <Input label="Имя" required {...bind('firstName')} />
              <Input label="Фамилия" required {...bind('lastName')} />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Input label="Email" value={user.email ?? ''} disabled hint="Email используется для входа" />
              <Input
                label="Телефон"
                required
                type="tel"
                {...bind('phone')}
                onChange={(event) => setField('phone', formatPhone(event.target.value))}
              />
            </div>

            {!isFreelancer && (
              <>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Select label="Страна" options={COUNTRIES} {...bind('country')} />
                  <Input label="Город" {...bind('city')} />
                </div>
                <Textarea
                  label="О себе"
                  maxLength={600}
                  rows={4}
                  placeholder="Чем занимается ваша компания, какие задачи обычно ставите исполнителям"
                  {...bind('about')}
                />
              </>
            )}
          </div>
        </Section>

        {isFreelancer && (
          <>
            <Section title="Специализация">
              <SpecializationFields values={values} errors={errors} onChange={setField} />
            </Section>
            <Section title="Навыки и опыт">
              <SkillsFields values={values} errors={errors} onChange={setField} />
            </Section>
            <Section title="Детали профиля">
              <DetailsFields values={values} errors={errors} onChange={setField} />
            </Section>
          </>
        )}

        <div className="sticky bottom-4 z-10 flex flex-wrap items-center justify-end gap-3 rounded-2xl bg-white/90 p-3 shadow-card backdrop-blur-md">
          {status === 'saved' && (
            <p className="mr-auto flex animate-fade-up items-center gap-2 pl-2 text-sm font-medium text-primary">
              <CheckIcon className="size-4" />
              Изменения сохранены
            </p>
          )}
          <Button to={ROUTES.account} variant="soft">
            {status === 'saved' ? 'Перейти в профиль' : 'Отмена'}
          </Button>
          <Button type="submit" loading={status === 'saving'}>
            Сохранить изменения
          </Button>
        </div>
      </form>
    </Container>
  )
}
