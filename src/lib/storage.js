/**
 * Безопасная обёртка над localStorage / sessionStorage.
 * В приватном режиме или при запрете cookies доступ к хранилищу может бросать исключение —
 * тогда просто возвращаем fallback, а приложение продолжает работать.
 */
function getStore(type) {
  try {
    return type === 'session' ? window.sessionStorage : window.localStorage
  } catch {
    return null
  }
}

export const storage = {
  get(key, fallback = null, type = 'local') {
    try {
      const raw = getStore(type)?.getItem(key)
      return raw ? JSON.parse(raw) : fallback
    } catch {
      return fallback
    }
  },

  set(key, value, type = 'local') {
    try {
      getStore(type)?.setItem(key, JSON.stringify(value))
    } catch {
      // хранилище переполнено или недоступно — данные останутся только в памяти
    }
  },

  remove(key, type = 'local') {
    try {
      getStore(type)?.removeItem(key)
    } catch {
      // нечего удалять
    }
  },
}
