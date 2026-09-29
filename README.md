# WorkTap — вёрстка фриланс-биржи

React 19 (JavaScript) + Vite + Tailwind CSS v4 + React Router.

```bash
npm install
npm run dev      # dev-сервер
npm run build    # сборка
npm run lint     # oxlint
npm run format   # prettier
```

## Структура

```
src/
├── app/                # App (провайдеры), роутер, ProtectedRoute
├── layouts/            # MainLayout (шапка + футер), AuthLayout (вход / регистрация)
├── pages/              # страницы; секции страницы — рядом с ней (pages/home/sections, pages/profile/…)
│   ├── auth/           # вход, регистрация (мастер по шагам), восстановление пароля
│   ├── account/        # ЛК: мои заказы, история покупок, выполненные работы, избранное, настройки
│   └── profile/        # профиль пользователя (свой и публичный)
├── components/
│   ├── ui/             # UI-кит: Button, Input, Dropdown, Tabs, TagInput, Stepper, Rating, Avatar…
│   ├── cards/          # карточки: ворк, сделка, заказ, отзыв, фрилансер
│   ├── account/        # общие блоки страниц ЛК (тулбар со фильтрами, список сделок)
│   ├── profile-form/   # поля профиля фрилансера — общие для регистрации и настроек
│   ├── layout/         # Header, UserMenu, MobileMenu, Footer, Logo
│   └── icons/          # SVG-иконки и иллюстрации
├── context/            # AuthProvider (сессия), FavoritesProvider (избранное)
├── services/           # authService, dataService — единственная точка доступа к данным
├── constants/          # маршруты, навигация, роли, статусы, изображения
├── data/mock/          # моковые данные (заменятся на API)
├── hooks/              # useAuth, useFavorites, useInView, useLoadMore…
├── lib/                # утилиты (cn)
└── styles/index.css    # Tailwind + дизайн-токены (@theme)
```

- Цвета, шрифт и тени задаются в `src/styles/index.css` в блоке `@theme` и доступны как утилиты: `bg-primary`, `text-accent`, `bg-lavender`…
- Импорты через алиас `@/` → `src/` (настроен в `vite.config.js` и `jsconfig.json` для подсказок в редакторе).
- Пути страниц берутся только из `ROUTES` (`src/constants/routes.js`).
- Ещё не свёрстанные страницы подключены через `PlaceholderPage` в `src/app/router.jsx`.
- Изображения лежат в `src/assets/images` и подключаются через `src/constants/images.js`.

## Авторизация и ЛК

Пока нет бэкенда, пользователи и сессия хранятся в localStorage (`src/services/authService.js`).
При подключении API меняются только файлы в `src/services/` — страницы и контексты остаются как есть.
Пароли в моке хранятся открытым текстом — это допустимо только для прототипа.

Роли: **заказчик** (быстрая регистрация, история покупок, мои заказы) и **фрилансер**
(регистрация по шагам: специализация → навыки и о себе → детали профиля; в ЛК — ворки, отзывы, выполненные работы).

Демо-аккаунты (пароль `demo1234`, кнопки быстрого заполнения есть на странице входа):

- фрилансер — `demo@worktap.kz`
- заказчик — `client@worktap.kz`

## Информационные окна

«О нас», «Как это работает», «Правила сервиса», «Политика безопасности», «Политика конфиденциальности»
открываются поверх любой страницы через параметр адреса `?info=` (`about`, `how-it-works`, `rules`, `security`, `privacy`).
Ссылка — компонент `InfoLink` (`src/components/info`), тексты документов — `src/data/content/legal.js`.
