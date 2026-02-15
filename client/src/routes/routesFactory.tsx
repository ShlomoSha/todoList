import { Navigate, type RouteObject } from "react-router-dom"
import type { RouteConfig } from "./routes.interface"
import ErrorPage from "../pages/errorPages/ErrorPage"
import NotFound from "../pages/errorPages/NotFound"

export const createRouteObject = (route: RouteConfig): RouteObject => {
  const routeObject: RouteObject = {
    path: route.path,
    ...(route.component && { element: <route.component /> }),
    ...(route.loader && { loader: route.loader }),
  }

  if (route.children && route.children.length > 0) {

    routeObject.errorElement = <ErrorPage />
    routeObject.children = [
      ...(route.defaultRoute ? [{
        index: true,
        element: <Navigate to={ route.defaultRoute } replace />,
      }] : []),
      ...route.children.map(createRouteObject),
      {
        path: '*',
        element: <NotFound />
      }
    ]    
  }
  
  return routeObject
}

export const createRoutes = (routes: RouteConfig[]): RouteObject[] => [
...routes.map(createRouteObject)
]