import { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'

const PAGE_SIZE = 6

const CATEGORIES = [
  { name: 'Тексты и переводы', dative: 'текстам и переводам' },
  { name: 'Разработка', dative: 'разработке' },
  { name: 'Дизайн', dative: 'дизайну' },
  { name: 'Аудио, видео монтаж', dative: 'аудио и видео монтажу' },
  { name: 'SEO и оптимизация', dative: 'SEO и оптимизации' },
  { name: 'Бизнес и жизнь', dative: 'бизнесу и жизни' },
  { name: 'Соцсети и реклама', dative: 'соцсетям и рекламе' },
]

// [title, category, author, projects, rating, reviews, budget, posted, offers]
const RAW_ORDERS = [
  ['Нужно сделать Дизайн сайта по тематике авто', 'Дизайн', 'Екатерина Иванова', 25, 4, 15, 50000, '4 часа 28 минут назад', 50],
  ['Логотип для кофейни в центре города', 'Дизайн', 'Алихан Сериков', 12, 5, 31, 25000, '5 часов 10 минут назад', 34],
  ['Дизайн мобильного приложения для доставки еды', 'Дизайн', 'Дарья Смирнова', 8, 4, 9, 180000, '6 часов назад', 21],
  ['Баннеры для рекламы в Instagram (10 штук)', 'Дизайн', 'Мария Ким', 40, 5, 64, 35000, '8 часов назад', 47],
  ['Фирменный стиль для барбершопа', 'Дизайн', 'Нурлан Ахметов', 17, 3, 12, 90000, '9 часов назад', 18],
  ['Дизайн презентации для инвесторов', 'Дизайн', 'Анна Петрова', 5, 4, 6, 40000, '11 часов назад', 26],
  ['Сверстать лендинг на React и Tailwind', 'Разработка', 'Данияр Жумабаев', 33, 5, 52, 120000, '12 часов назад', 29],
  ['Интернет-магазин одежды: сайт под ключ', 'Разработка', 'Ербол Касымов', 14, 4, 20, 350000, '14 часов назад', 15],
  ['Телеграм-бот для записи клиентов', 'Разработка', 'Ольга Соколова', 9, 5, 17, 60000, '15 часов назад', 38],
  ['Доработать сайт на WordPress: дизайн и скорость', 'Разработка', 'Тимур Оспанов', 21, 4, 28, 45000, '16 часов назад', 22],
  ['Написать парсер цен с сайтов конкурентов', 'Разработка', 'Виктория Ли', 6, 3, 5, 30000, '18 часов назад', 12],
  ['Перевод сайта с русского на английский', 'Тексты и переводы', 'Айгерим Бекова', 44, 5, 87, 20000, '19 часов назад', 41],
  ['Написать 10 статей для блога о путешествиях', 'Тексты и переводы', 'Сергей Волков', 19, 4, 33, 30000, '20 часов назад', 27],
  ['Копирайтинг: тексты для сайта стоматологии', 'Тексты и переводы', 'Мадина Нуржанова', 11, 5, 14, 15000, '21 час назад', 36],
  ['Расшифровка интервью на казахском языке', 'Тексты и переводы', 'Артём Крылов', 7, 4, 8, 12000, '22 часа назад', 19],
  ['Смонтировать видео для YouTube-канала', 'Аудио, видео монтаж', 'Динара Сатыбалды', 26, 5, 45, 22000, '1 день назад', 33],
  ['Озвучка рекламного ролика на русском', 'Аудио, видео монтаж', 'Игорь Морозов', 15, 4, 19, 18000, '1 день назад', 24],
  ['Монтаж свадебного видео с цветокоррекцией', 'Аудио, видео монтаж', 'Жанна Токаева', 30, 5, 59, 70000, '1 день назад', 30],
  ['SEO-продвижение сайта юридической компании', 'SEO и оптимизация', 'Руслан Абдрахманов', 22, 4, 26, 100000, '2 дня назад', 16],
  ['Аудит сайта и оптимизация скорости загрузки', 'SEO и оптимизация', 'Светлана Орлова', 13, 5, 21, 55000, '2 дня назад', 20],
  ['Составить бизнес-план для кофейни', 'Бизнес и жизнь', 'Арман Тлеубаев', 10, 4, 11, 75000, '2 дня назад', 14],
  ['Консультация по налогам для ИП', 'Бизнес и жизнь', 'Полина Егорова', 18, 5, 37, 10000, '3 дня назад', 25],
  ['Ведение Instagram для салона красоты', 'Соцсети и реклама', 'Санжар Мустафин', 27, 4, 40, 80000, '3 дня назад', 43],
  ['Настроить таргетированную рекламу для сайта', 'Соцсети и реклама', 'Елена Захарова', 35, 5, 68, 65000, '3 дня назад', 39],
]

const ORDERS = RAW_ORDERS.map(
  ([title, category, author, projects, rating, reviews, budget, posted, offers], i) => ({
    id: i + 1,
    title,
    category,
    author,
    projects,
    rating,
    reviews,
    budget,
    posted,
    offers,
  }),
)

const SORTS = [
  { value: 'asc', label: 'По возрастанию цены' },
  { value: 'desc', label: 'По убыванию цены' },
  { value: 'new', label: 'Сначала новые' },
]

const formatMoney = (n) => n.toLocaleString('ru-RU').replace(/\u00A0/g, ' ')
const onlyDigits = (v) => v.replace(/\D/g, '')

function Star({ filled }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-4 w-4 ${filled ? 'fill-[#F2A65A]' : 'fill-[#A9A3D6]'}`}
      aria-hidden="true"
    >
      <path d="M12 2l2.9 6.3 6.9.7-5.2 4.6 1.5 6.8L12 17l-6.1 3.4 1.5-6.8L2.2 9l6.9-.7z" />
    </svg>
  )
}

function OrderCard({ order }) {
  return (
    <Link
      to={ROUTES.order(order.id)}
      className="block rounded-2xl border border-[#EEF1F6] bg-[#F9FBFE] p-4 transition hover:bg-white hover:shadow-[0_6px_24px_rgba(90,80,150,0.10)] sm:p-5"
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <h3 className="text-base font-semibold text-[#1c1c1e] sm:text-lg">{order.title}</h3>
        <div className="shrink-0 sm:text-right">
          <p className="text-base font-semibold text-[#52BA7C] sm:text-lg">
            Бюджет: {formatMoney(order.budget)} тенге
          </p>
          <p className="mt-1 hidden text-xs text-[#8b8b95] sm:block">{order.posted}</p>
        </div>
      </div>

      <div className="mt-3 flex items-end justify-between gap-4">
        <div className="flex items-center gap-3 sm:gap-4">
          <img
            src={'https://i.pravatar.cc/150?u=' + order.author}
            alt={order.author}
            className="h-14 w-14 shrink-0 rounded-full object-cover sm:h-[84px] sm:w-[84px]"
          />
          <div>
            <p className="text-sm text-[#1c1c1e]">{order.author}</p>
            <p className="mt-1 text-sm text-[#1c1c1e]">
              Размещено проектов на бирже: {order.projects}
            </p>
            <div className="mt-1 flex items-center gap-2">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star key={n} filled={n <= order.rating} />
                ))}
              </div>
              <span className="text-[11px] font-semibold text-[#1c1c1e]">
                {order.reviews} отзывов
              </span>
            </div>
          </div>
        </div>

        <div className="shrink-0 text-right text-sm text-[#8b8b95]">
          <p className="mb-1 text-xs sm:hidden">{order.posted}</p>
          <p>Предложений: {order.offers}</p>
        </div>
      </div>
    </Link>
  )
}

export function ServicesPage() {
  const [draft, setDraft] = useState('')
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState(null) // null = все категории
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [sort, setSort] = useState('asc')
  const [visible, setVisible] = useState(PAGE_SIZE)
  const resultsRef = useRef(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const min = minPrice ? Number(minPrice) : 0
    const max = maxPrice ? Number(maxPrice) : Infinity

    const list = ORDERS.filter((o) => {
      if (category && o.category !== category) return false
      if (o.budget < min || o.budget > max) return false
      if (!q) return true
      return (
        o.title.toLowerCase().includes(q) ||
        o.author.toLowerCase().includes(q) ||
        o.category.toLowerCase().includes(q)
      )
    })

    if (sort === 'asc') return [...list].sort((a, b) => a.budget - b.budget)
    if (sort === 'desc') return [...list].sort((a, b) => b.budget - a.budget)
    return list
  }, [query, category, minPrice, maxPrice, sort])

  const shown = filtered.slice(0, visible)
  const activeCategory = CATEGORIES.find((c) => c.name === category)

  const resetVisible = () => setVisible(PAGE_SIZE)

  const handleSearch = () => {
    setQuery(draft)
    resetVisible()
    resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleDraftChange = (e) => {
    const value = e.target.value
    setDraft(value)
    if (value === '') {
      setQuery('')
      resetVisible()
    }
  }

  const handleCategory = (name) => {
    setCategory((prev) => (prev === name ? null : name))
    resetVisible()
    resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleReset = () => {
    setDraft('')
    setQuery('')
    setCategory(null)
    setMinPrice('')
    setMaxPrice('')
    setSort('asc')
    resetVisible()
  }

  const chipBase =
    'rounded-full border px-4 py-1.5 text-xs transition sm:text-[13px]'
  const chipIdle = 'border-[#ECE9F7] bg-white/60 text-[#3a3a45] hover:border-[#F2A65A]'
  const chipActive = 'border-[#F2A65A] bg-[#FDF1E4] text-[#D9822B]'

  return (
    <div className="bg-[#F7FAFD]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#F5F3FF] px-4 pb-14 pt-16 sm:pb-20 sm:pt-24">
        <span className="pointer-events-none absolute -left-16 top-24 hidden h-32 w-32 rounded-full bg-[#FDEBD6] sm:block lg:h-[135px] lg:w-[135px]" />
        <span className="pointer-events-none absolute left-1/2 top-6 hidden h-14 w-14 rounded-full bg-[#FDEBD6] sm:block" />
        <span className="pointer-events-none absolute right-[8%] top-16 hidden h-[72px] w-[72px] rounded-full bg-[#DDF8E8] sm:block" />
        <span className="pointer-events-none absolute bottom-10 left-[22%] hidden h-10 w-10 rounded-full bg-[#DDF8E8] sm:block" />
        <span className="pointer-events-none absolute bottom-10 right-[14%] hidden h-10 w-10 rounded-full bg-[#FDEBD6] sm:block" />

        <div className="relative mx-auto max-w-[1000px] text-center">
          <h1 className="text-2xl font-bold leading-snug text-[#1c1c1e] sm:text-3xl">
            Ищите и находите подходящую работу среди{' '}
            <span className="text-[#52BA7C]">10,000+</span> проектов и покажите на что Вы способны!
          </h1>

          <div className="mx-auto mt-8 flex max-w-[460px] items-center rounded-full bg-[#ECE9F7] p-1 sm:mt-10">
            <input
              value={draft}
              onChange={handleDraftChange}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Какую работу ищете?"
              className="min-w-0 flex-1 bg-transparent px-4 text-sm text-[#1c1c1e] outline-none placeholder:text-[#8b8b95]"
            />
            <button
              type="button"
              onClick={handleSearch}
              className="rounded-full bg-[#F2A65A] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#e8953f]"
            >
              Найти
            </button>
          </div>

          <div className="mx-auto mt-8 flex max-w-[640px] flex-wrap justify-center gap-2 sm:gap-3">
            {CATEGORIES.map((c) => (
              <button
                key={c.name}
                type="button"
                onClick={() => handleCategory(c.name)}
                className={chipBase + ' ' + (category === c.name ? chipActive : chipIdle)}
              >
                {c.name}
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                setCategory(null)
                resetVisible()
              }}
              className={chipBase + ' ' + (category === null ? chipActive : 'border-[#F2A65A] text-[#F2A65A] hover:bg-[#FDF1E4]')}
            >
              Все категории
            </button>
          </div>

          <p className="mt-10 text-lg text-[#1c1c1e] sm:text-xl">
            Ниже все заказы
            {activeCategory && (
              <>
                {' '}по <span className="text-[#52BA7C]">{activeCategory.dative}</span>
              </>
            )}
          </p>
          <svg
            viewBox="0 0 24 24"
            className="mx-auto mt-2 h-6 w-6 stroke-[#52BA7C]"
            fill="none"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </section>

      {/* LIST */}
      <section ref={resultsRef} className="mx-auto max-w-[1000px] scroll-mt-4 px-4 py-10 sm:py-12">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <h2 className="text-lg font-semibold text-[#1c1c1e] sm:text-xl">
            {filtered.length} проектов
            {activeCategory ? ' по  ' + activeCategory.dative : ''}
          </h2>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <input
              value={minPrice}
              onChange={(e) => {
                setMinPrice(onlyDigits(e.target.value))
                resetVisible()
              }}
              inputMode="numeric"
              placeholder="Минимальная цена"
              className="w-full rounded-full border border-[#ECE9F7] bg-white px-4 py-2 text-xs outline-none focus:border-[#52BA7C] sm:w-[140px]"
            />
            <span className="hidden text-[#8b8b95] sm:inline">—</span>
            <input
              value={maxPrice}
              onChange={(e) => {
                setMaxPrice(onlyDigits(e.target.value))
                resetVisible()
              }}
              inputMode="numeric"
              placeholder="Максимальная цена"
              className="w-full rounded-full border border-[#ECE9F7] bg-white px-4 py-2 text-xs outline-none focus:border-[#52BA7C] sm:w-[140px]"
            />
            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value)
                resetVisible()
              }}
              className="w-full rounded-full border border-[#ECE9F7] bg-white px-4 py-2 text-sm outline-none focus:border-[#52BA7C] sm:w-auto"
            >
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {shown.length === 0 ? (
          <div className="rounded-2xl border border-[#EEF1F6] bg-[#F9FBFE] px-4 py-14 text-center">
            <p className="text-base text-[#1c1c1e]">Ничего не нашлось по вашему запросу</p>
            <button
              type="button"
              onClick={handleReset}
              className="mt-4 rounded-full border border-[#52BA7C] px-6 py-2 text-sm text-[#52BA7C] transition hover:bg-[#52BA7C] hover:text-white"
            >
              Сбросить фильтры
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {shown.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}

        {visible < filtered.length && (
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => setVisible((v) => v + PAGE_SIZE)}
              className="rounded-full border border-[#52BA7C] px-10 py-2.5 text-sm font-medium text-[#52BA7C] transition hover:bg-[#52BA7C] hover:text-white"
            >
              Загрузить еще
            </button>
          </div>
        )}
      </section>
    </div>
  )
}