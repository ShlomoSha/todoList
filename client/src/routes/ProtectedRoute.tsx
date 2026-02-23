import { Navigate, Outlet } from 'react-router-dom'
import useLocalStorage from '../hooks/useLocalStorage'
import { authEndpoint } from '../api/authService'
import { ROUTES } from './routes.constants'

export default function ProtectedRoute() {
  const { getToken } = useLocalStorage()

  if (!getToken()) {
    return <Navigate to={`/${authEndpoint(ROUTES.LOGIN)}`} replace />
  }

  return <Outlet />
}
