import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as EventsImport } from './routes/events'
import { Route as AboutImport } from './routes/about'



const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)


const EventsRoute = EventsImport.update({
  path: '/events',
  getParentRoute: () => rootRoute,
} as any)


const AboutRoute = AboutImport.update({
  path: '/about',
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
    '/events': {
      id: '/events'
      path: '/events'
      fullPath: '/events'
      preLoaderRoute: typeof EventsImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutImport
      parentRoute: typeof rootRoute
    }
  }
}

export const routeTree = rootRoute.addChildren([
  IndexRoute,
  EventsRoute,
  AboutRoute
])