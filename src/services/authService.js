/**
 * Мок-сервер авторизации на localStorage.
 * Интерфейс (асинхронные функции, ошибки AuthError) повторяет будущий API —
 * при подключении бэкенда меняется только этот файл, страницы трогать не нужно.
 *
 * ВАЖНО: пароли здесь хранятся в localStorage открытым текстом — это допустимо только для прототипа.
 */
import { SEED_USERS } from '@/data/mock/users'
import { storage } from '@/lib/storage'

const USERS_KEY = 'worktap:users'
const OVERRIDES_KEY = 'worktap:user-overrides'
const SESSION_KEY = 'worktap:session'

export class AuthError extends Error {
  constructor(message, field) {
    super(message)
    this.name = 'AuthError'
    this.field = field
  }
}

const delay = (ms = 600) => new Promise((resolve) => setTimeout(resolve, ms))

const readRegistered = () => storage.get(USERS_KEY, [])

/** Убираем пароль, прежде чем отдавать пользователя в интерфейс */
const toPublicUser = ({ password: _password, ...user }) => user

const normalizeEmail = (email) => email.trim().toLowerCase()

function getAllUsers() {
  // изменения профилей демо-пользователей храним отдельно, сами демо-данные живут в коде
  const overrides = storage.get(OVERRIDES_KEY, {})
  const seeded = SEED_USERS.map((user) => {
    const patch = overrides[user.id]
    return patch ? { ...user, ...patch, profile: { ...user.profile, ...patch.profile } } : user
  })
  return [...seeded, ...readRegistered()]
}

const findByEmail = (email) => getAllUsers().find((user) => user.email && user.email === normalizeEmail(email))

export function getUserById(id) {
  const user = getAllUsers().find((item) => item.id === id)
  return user ? toPublicUser(user) : null
}

function saveSession(userId, remember) {
  // «Запомнить меня» — сессия переживёт закрытие браузера, иначе только до закрытия вкладки
  storage.remove(SESSION_KEY)
  storage.remove(SESSION_KEY, 'session')
  storage.set(SESSION_KEY, userId, remember ? 'local' : 'session')
}

export function getSessionUser() {
  const userId = storage.get(SESSION_KEY) ?? storage.get(SESSION_KEY, null, 'session')
  return userId ? getUserById(userId) : null
}

export async function login({ email, password, remember = true }) {
  await delay()
  const user = findByEmail(email)
  if (!user || !user.password || user.password !== password) {
    throw new AuthError('Неверный email или пароль')
  }
  saveSession(user.id, remember)
  return toPublicUser(user)
}

export async function checkEmailAvailable(email) {
  await delay(400)
  if (findByEmail(email)) {
    throw new AuthError('Пользователь с таким email уже зарегистрирован', 'email')
  }
}

export async function register(data) {
  await delay(800)
  if (findByEmail(data.email)) {
    throw new AuthError('Пользователь с таким email уже зарегистрирован', 'email')
  }

  const user = {
    ...data,
    id: `u-${crypto.randomUUID()}`,
    email: normalizeEmail(data.email),
    isOnline: true,
    createdAt: new Date().toISOString(),
  }
  storage.set(USERS_KEY, [...readRegistered(), user])
  saveSession(user.id, true)
  return toPublicUser(user)
}

export async function updateProfile(userId, patch) {
  await delay(500)
  const registered = readRegistered()
  const index = registered.findIndex((user) => user.id === userId)

  if (index >= 0) {
    const current = registered[index]
    registered[index] = { ...current, ...patch, profile: { ...current.profile, ...patch.profile } }
    storage.set(USERS_KEY, registered)
  } else {
    const overrides = storage.get(OVERRIDES_KEY, {})
    const current = overrides[userId] ?? {}
    overrides[userId] = { ...current, ...patch, profile: { ...current.profile, ...patch.profile } }
    storage.set(OVERRIDES_KEY, overrides)
  }

  return getUserById(userId)
}

export function logout() {
  storage.remove(SESSION_KEY)
  storage.remove(SESSION_KEY, 'session')
}

/** Всегда «успешно», чтобы по ответу нельзя было узнать, зарегистрирован ли email */
export async function requestPasswordReset() {
  await delay()
}

export async function resetPassword() {
  await delay()
}
