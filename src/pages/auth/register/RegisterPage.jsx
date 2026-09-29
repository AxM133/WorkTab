import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { AvatarUpload } from '@/components/profile-form/AvatarUpload'
import { DetailsFields } from '@/components/profile-form/DetailsFields'
import { SkillsFields } from '@/components/profile-form/SkillsFields'
import { SpecializationFields } from '@/components/profile-form/SpecializationFields'
import {
  EMPTY_PROFILE_VALUES,
  toProfile,
  validateDetails,
  validateSkills,
  validateSpecialization,
} from '@/components/profile-form/validation'
import { Button, Stepper } from '@/components/ui'
import { ROLES } from '@/constants/profile'
import { ROUTES } from '@/constants/routes'
import { useAuth } from '@/hooks/useAuth'
import { checkEmailAvailable } from '@/services/authService'
import { AuthHeading } from '../AuthHeading'
import { validateAccount } from '../validation'
import { AccountFields } from './AccountFields'
import { RegisterSuccess } from './RegisterSuccess'
import { RoleStep } from './RoleStep'

const INITIAL_VALUES = {
  role: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  passwordConfirm: '',
  agree: false,
  ...EMPTY_PROFILE_VALUES,
}

const ROLE_STEP = {
  id: 'role',
  label: 'Роль',
  title: 'Создайте аккаунт',
  subtitle: 'Как вы планируете работать на WorkTap?',
  validate: (values) => (values.role ? {} : { role: 'Выберите, кем вы будете на сайте' }),
}

const ACCOUNT_STEP = {
  id: 'account',
  label: 'Аккаунт',
  title: 'Данные для входа',
  subtitle: 'Email и пароль понадобятся для входа в личный кабинет',
  validate: validateAccount,
}

// Фрилансер дополнительно по шагам заполняет профиль — всё это отобразится в его ЛК
const FREELANCER_STEPS = [
  ROLE_STEP,
  ACCOUNT_STEP,
  {
    id: 'specialization',
    label: 'Специализация',
    title: 'Чем вы занимаетесь?',
    subtitle: 'Выберите направление — по нему заказчики будут находить ваш профиль',
    validate: validateSpecialization,
  },
  {
    id: 'skills',
    label: 'Навыки и опыт',
    title: 'Расскажите о себе',
    subtitle: 'Навыки и описание опыта увидят заказчики в вашем профиле',
    validate: validateSkills,
  },
  {
    id: 'details',
    label: 'Детали профиля',
    title: 'Почти готово',
    subtitle: 'Добавьте фото и подробности — профиль будет выглядеть солиднее',
    validate: validateDetails,
  },
]

const CLIENT_STEPS = [ROLE_STEP, ACCOUNT_STEP]

function toRegistrationData(values) {
  const base = {
    role: values.role,
    firstName: values.firstName.trim(),
    lastName: values.lastName.trim(),
    email: values.email.trim(),
    phone: values.phone,
    password: values.password,
    avatar: values.avatar,
  }
  return values.role === ROLES.freelancer
    ? { ...base, profile: toProfile(values) }
    : { ...base, profile: { about: '', country: 'Казахстан', city: '' } }
}

export function RegisterPage() {
  const { user, register } = useAuth()
  const [stepIndex, setStepIndex] = useState(0)
  const [values, setValues] = useState(INITIAL_VALUES)
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDone, setIsDone] = useState(false)

  if (user && isDone) return <RegisterSuccess user={user} />
  if (user) return <Navigate to={ROUTES.account} replace />

  const steps = values.role === ROLES.freelancer ? FREELANCER_STEPS : CLIENT_STEPS
  const step = steps[stepIndex]
  const isLastStep = stepIndex === steps.length - 1

  const setField = (field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
    setFormError('')
  }

  const goTo = (index) => {
    setStepIndex(index)
    setErrors({})
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const submit = async () => {
    setIsDone(true)
    try {
      await register(toRegistrationData(values))
    } catch (error) {
      setIsDone(false)
      if (error.field === 'email') {
        goTo(1)
        setErrors({ email: error.message })
      } else {
        setFormError(error.message)
      }
    }
  }

  const handleNext = async (event) => {
    event.preventDefault()
    const stepErrors = step.validate(values)
    if (Object.keys(stepErrors).length) {
      setErrors(stepErrors)
      return
    }

    setIsSubmitting(true)
    try {
      if (isLastStep) {
        await submit()
      } else {
        // email проверяем сразу, чтобы фрилансер не узнал о проблеме после заполнения всех шагов
        if (step.id === 'account') await checkEmailAvailable(values.email)
        goTo(stepIndex + 1)
      }
    } catch (error) {
      setErrors(error.field ? { [error.field]: error.message } : {})
      if (!error.field) setFormError(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Stepper steps={steps.map((item) => item.label)} current={stepIndex} className="mb-10 animate-fade-up" />

      {/* key перезапускает анимацию появления при смене шага */}
      <form key={step.id} onSubmit={handleNext} noValidate>
        <AuthHeading title={step.title} subtitle={step.subtitle} />

        <div className="animate-fade-up [animation-delay:80ms]">
          {formError && (
            <p className="mb-5 rounded-xl bg-danger/10 px-4 py-3 text-sm text-danger" role="alert">
              {formError}
            </p>
          )}

          {step.id === 'role' && (
            <RoleStep value={values.role} onChange={(role) => setField('role', role)} error={errors.role} />
          )}
          {step.id === 'account' && <AccountFields values={values} errors={errors} onChange={setField} />}
          {step.id === 'specialization' && <SpecializationFields values={values} errors={errors} onChange={setField} />}
          {step.id === 'skills' && <SkillsFields values={values} errors={errors} onChange={setField} />}
          {step.id === 'details' && (
            <div className="flex flex-col gap-7">
              <AvatarUpload
                value={values.avatar}
                name={`${values.firstName} ${values.lastName}`}
                onChange={(avatar) => setField('avatar', avatar)}
              />
              <DetailsFields values={values} errors={errors} onChange={setField} />
            </div>
          )}
        </div>

        <div className="mt-10 flex gap-3">
          {stepIndex > 0 && (
            <Button variant="soft" size="lg" onClick={() => goTo(stepIndex - 1)} className="px-8">
              Назад
            </Button>
          )}
          <Button type="submit" size="lg" fullWidth loading={isSubmitting}>
            {isLastStep ? 'Зарегистрироваться' : 'Далее'}
          </Button>
        </div>
      </form>

      <p className="mt-8 text-center text-sm">
        Уже есть аккаунт?{' '}
        <Link to={ROUTES.login} className="font-semibold text-primary hover:underline">
          Войти
        </Link>
      </p>
    </>
  )
}
