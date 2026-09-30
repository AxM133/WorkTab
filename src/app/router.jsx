import { createBrowserRouter } from 'react-router-dom'
import { ROLES } from '@/constants/profile'
import { ROUTES } from '@/constants/routes'
import { AuthLayout } from '@/layouts/AuthLayout'
import { MainLayout } from '@/layouts/MainLayout'
import { StandaloneLayout } from '@/layouts/StandaloneLayout'
import { AccountPage } from '@/pages/account/AccountPage'
import { CompletedWorksPage } from '@/pages/account/CompletedWorksPage'
import { EditProfilePage } from '@/pages/account/EditProfilePage'
import { FavoritesPage } from '@/pages/account/FavoritesPage'
import { MyOrdersPage } from '@/pages/account/MyOrdersPage'
import { PurchasesPage } from '@/pages/account/PurchasesPage'
import { ForgotPasswordPage } from '@/pages/auth/ForgotPasswordPage'
import { LoginPage } from '@/pages/auth/LoginPage'
import { RegisterPage } from '@/pages/auth/register/RegisterPage'
import { ResetPasswordPage } from '@/pages/auth/ResetPasswordPage'
import { HomePage } from '@/pages/home/HomePage'
import { NotFoundPage } from '@/pages/not-found/NotFoundPage'
import { PlaceholderPage } from '@/pages/placeholder/PlaceholderPage'
import { UserProfilePage } from '@/pages/profile/UserProfilePage'
import { CreateWorkPage } from '@/pages/works/CreateWorkPage'
import { WorkDetailPage } from '@/pages/works/WorkDetailPage'
import { WorksPage } from '@/pages/works/WorksPage'
import { ContestDetailPage } from '@/pages/contests/ContestDetailPage'
import { ContestsPage } from '@/pages/contests/ContestsPage'
import { CreateContestPage } from '@/pages/contests/CreateContestPage'
import { ServicesPage } from '@/pages/services/ServicesPage'
import { CreateOrderPage } from '@/pages/services/CreateOrderPage'
import { ProtectedRoute } from './ProtectedRoute'

// Страницы, которые ещё не свёрстаны. По мере готовности заменяем PlaceholderPage на реальный компонент.
const pendingPages = [
  { path: ROUTES.order(':id'), title: 'Страница заказа' },
  { path: ROUTES.freelancers, title: 'Топ фрилансеров' },
  { path: ROUTES.chat, title: 'Чат' },
  { path: ROUTES.wallet, title: 'Кошелёк' },
  { path: ROUTES.search, title: 'Быстрый поиск' },
]

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: ROUTES.home, element: <HomePage /> },
      { path: ROUTES.profile(':id'), element: <UserProfilePage /> },
      { path: ROUTES.contests, element: <ContestsPage /> },
      { path: ROUTES.contest(':id'), element: <ContestDetailPage /> },

      { path: ROUTES.exchange, element: <ServicesPage /> },
      { path: ROUTES.createOrder, element: <CreateOrderPage /> },

      // Личный кабинет — только для авторизованных
      {
        element: <ProtectedRoute />,
        children: [
          { path: ROUTES.account, element: <AccountPage /> },
          { path: ROUTES.accountEdit, element: <EditProfilePage /> },
          { path: ROUTES.myOrders, element: <MyOrdersPage /> },
        ],
      },
      {
        element: <ProtectedRoute roles={[ROLES.client]} />,
        children: [{ path: ROUTES.purchases, element: <PurchasesPage /> }],
      },
      {
        element: <ProtectedRoute roles={[ROLES.freelancer]} />,
        children: [
          { path: ROUTES.completed, element: <CompletedWorksPage /> },
          { path: ROUTES.createWork, element: <CreateWorkPage /> },
          { path: ROUTES.editWork(':id'), element: <CreateWorkPage /> },
        ],
      },
      {
        element: <ProtectedRoute roles={[ROLES.client]} />,
        children: [{ path: ROUTES.createContest, element: <CreateContestPage /> }],
      },

      ...pendingPages.map(({ path, title }) => ({
        path,
        element: <PlaceholderPage title={title} />,
      })),
      { path: '*', element: <NotFoundPage /> },
    ],
  },
  {
    element: <StandaloneLayout />,
    children: [
      { path: ROUTES.works, element: <WorksPage /> },
      { path: ROUTES.work(':id'), element: <WorkDetailPage /> },
      {
        element: <ProtectedRoute />,
        children: [{ path: ROUTES.favorites, element: <FavoritesPage /> }],
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: ROUTES.login, element: <LoginPage /> },
      { path: ROUTES.register, element: <RegisterPage /> },
      { path: ROUTES.forgotPassword, element: <ForgotPasswordPage /> },
      { path: ROUTES.resetPassword, element: <ResetPasswordPage /> },
    ],
  },
])
