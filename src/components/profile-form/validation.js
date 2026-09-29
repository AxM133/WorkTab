import { ABOUT_MIN_LENGTH } from '@/constants/profile'

/** Плоские значения формы профиля фрилансера (используются в регистрации и настройках) */
export const EMPTY_PROFILE_VALUES = {
  specialization: '',
  categoryId: '',
  services: [],
  skills: [],
  about: '',
  country: 'Казахстан',
  city: '',
  languages: [],
  education: [''],
  certificates: [],
  avatar: null,
}

export function validateSpecialization(values) {
  const errors = {}
  if (!values.specialization.trim()) errors.specialization = 'Укажите вашу специализацию'
  if (!values.categoryId) errors.categoryId = 'Выберите категорию'
  else if (!values.services.length) errors.services = 'Отметьте хотя бы одно направление'
  return errors
}

export function validateSkills(values) {
  const errors = {}
  if (values.skills.length < 3) errors.skills = 'Добавьте минимум 3 навыка'
  if (values.about.trim().length < ABOUT_MIN_LENGTH) {
    errors.about = `Расскажите о себе подробнее — минимум ${ABOUT_MIN_LENGTH} символов`
  }
  return errors
}

export function validateDetails(values) {
  const errors = {}
  if (!values.country) errors.country = 'Выберите страну'
  if (!values.city.trim()) errors.city = 'Укажите город'
  if (!values.languages.length) errors.languages = 'Добавьте хотя бы один язык'
  return errors
}

const cleanList = (list) => list.map((item) => item.trim()).filter(Boolean)

/** Значения формы → user.profile */
export function toProfile(values) {
  return {
    specialization: values.specialization.trim(),
    categoryId: values.categoryId,
    services: values.services,
    skills: values.skills,
    about: values.about.trim(),
    country: values.country,
    city: values.city.trim(),
    languages: values.languages,
    education: cleanList(values.education),
    certificates: cleanList(values.certificates),
  }
}

/** user → значения формы (для страницы настроек) */
export function fromUser(user) {
  const profile = user.profile ?? {}
  return {
    ...EMPTY_PROFILE_VALUES,
    ...profile,
    education: profile.education?.length ? profile.education : [''],
    certificates: profile.certificates ?? [],
    avatar: user.avatar ?? null,
  }
}
