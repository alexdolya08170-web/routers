import { createFileRoute } from '@tanstack/react-router'

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as PrivacyPolicyImport } from './routes/privacy-policy'
import { Route as EventsImport } from './routes/events'
import { Route as NewsImport } from './routes/news'
import { Route as AboutImport } from './routes/about'
import { Route as LoginImport } from './routes/login'
import { Route as SearchImport } from './routes/search'
// 1. Імпортуємо новий маршрут
import { Route as DashboardImport } from './routes/dashboard' 

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const PrivacyPolicyRoute = PrivacyPolicyImport.update({
  path: '/privacy-policy',
  getParentRoute: () => rootRoute,
} as any)

const EventsRoute = EventsImport.update({
  path: '/events',
  getParentRoute: () => rootRoute,
} as any)

const NewsRoute = NewsImport.update({
  path: '/news',
  getParentRoute: () => rootRoute,
} as any)

const AboutRoute = AboutImport.update({
  path: '/about',
  getParentRoute: () => rootRoute,
} as any)

const LoginRoute = LoginImport.update({
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const SearchRoute = SearchImport.update({
  path: '/search',
  getParentRoute: () => rootRoute,
} as any)

// 2. Створюємо об'єкт маршруту для Dashboard
const DashboardRoute = DashboardImport.update({
  path: '/dashboard',
  getParentRoute: () => rootRoute,
} as any)

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/privacy-policy': {
      id: '/privacy-policy'
      path: '/privacy-policy'
      fullPath: '/privacy-policy'
      preLoaderRoute: typeof PrivacyPolicyImport
      parentRoute: typeof rootRoute
    }
    '/events': {
      id: '/events'
      path: '/events'
      fullPath: '/events'
      preLoaderRoute: typeof EventsImport
      parentRoute: typeof rootRoute
    }
    '/news': {
      id: '/news'
      path: '/news'
      fullPath: '/news'
      preLoaderRoute: typeof NewsImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/search': {
      id: '/search'
      path: '/search'
      fullPath: '/search'
      preLoaderRoute: typeof SearchImport
      parentRoute: typeof rootRoute
    }
    // 3. Додаємо тип для Dashboard
    '/dashboard': {
      id: '/dashboard'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof DashboardImport
      parentRoute: typeof rootRoute
    }
  }
}

export const routeTree = rootRoute.addChildren([
  IndexRoute,
  PrivacyPolicyRoute,
  EventsRoute,
  NewsRoute,
  AboutRoute,
  LoginRoute,
  SearchRoute,
  DashboardRoute, // 4. Додаємо в масив дітей
])