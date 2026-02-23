import { Navigate, type RouteObject } from "react-router-dom"
import type { RouteConfig } from "./routes.interface"
import ErrorPage from "../pages/errorPages/ErrorPage"
import NotFound from "../pages/errorPages/NotFound"
import ProtectedRoute from "./ProtectedRoute"

export const createRouteObject = (route: RouteConfig): RouteObject => {
  const innerChildren: RouteObject[] = []

  if (route.children && route.children.length > 0) {
    innerChildren.push(
      ...(route.defaultRoute ? [{
        index: true,
        element: <Navigate to={ route.defaultRoute } replace />,
      }] : []),
      ...route.children.map(createRouteObject),
      { path: '*', element: <NotFound /> }
    )
  }

  const innerRoute: RouteObject = {
    ...(route.component && { element: <route.component /> }),
    ...(route.loader && { loader: route.loader }),
    ...(innerChildren.length > 0 && {
      errorElement: <ErrorPage />,
      children: innerChildren,
    }),
  }

  if (route.protected) {
    return {
      path: route.path,
      element: <ProtectedRoute />,
      children: [
        { path: '', ...innerRoute },
      ],
    }
  }

  return {
    path: route.path,
    ...innerRoute,
  }
}

export const createRoutes = (routes: RouteConfig[]): RouteObject[] => [
  ...routes.map(createRouteObject)
]
