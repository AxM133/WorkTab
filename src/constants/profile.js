export const ROLES = {
  client: 'client',
  freelancer: 'freelancer',
}

export const ROLE_LABELS = {
  [ROLES.client]: 'Заказчик',
  [ROLES.freelancer]: 'Фрилансер',
}

export const SPECIALIZATIONS = [
  'Дизайнер',
  'Веб-разработчик',
  'Frontend-разработчик',
  'Backend-разработчик',
  'Мобильный разработчик',
  'Копирайтер',
  'Переводчик',
  'SEO-специалист',
  'SMM-специалист',
  'Маркетолог',
  'Видеомонтажёр',
  'Motion-дизайнер',
  'Иллюстратор',
]

/** Подсказки навыков для каждой категории (id из data/mock/categories) */
export const SKILL_SUGGESTIONS = {
  design: ['Figma', 'Adobe Photoshop', 'Adobe Illustrator', 'Corel Draw', 'Adobe After Effects', 'HTML/CSS', 'Sketch'],
  development: ['JavaScript', 'React', 'TypeScript', 'Node.js', 'PHP', 'Laravel', 'Python', 'WordPress', 'SQL'],
  texts: ['Копирайтинг', 'SEO-тексты', 'Редактура', 'Английский язык', 'Сторителлинг'],
  media: ['Adobe Premiere Pro', 'DaVinci Resolve', 'After Effects', 'Final Cut Pro', 'Adobe Audition'],
  seo: ['Google Analytics', 'Яндекс.Метрика', 'Ahrefs', 'Semrush', 'Google Search Console'],
  business: ['Excel', '1С', 'Финансовый анализ', 'Бизнес-планы', 'Презентации'],
  smm: ['Instagram', 'TikTok', 'Таргетированная реклама', 'Контент-план', 'Canva'],
}

export const COUNTRIES = ['Казахстан', 'Россия', 'Узбекистан', 'Кыргызстан', 'Беларусь', 'Другая страна']

export const LANGUAGES = ['Казахский', 'Русский', 'Английский', 'Узбекский', 'Кыргызский', 'Турецкий', 'Немецкий']

export const ABOUT_MIN_LENGTH = 50
