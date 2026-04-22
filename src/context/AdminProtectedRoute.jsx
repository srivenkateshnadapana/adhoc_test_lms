import * as React from "react"
import { useNavigate } from "react-router-dom"
import { StorageService, AUTH_KEY } from "../services/storage"

export function AdminProtectedRoute({ children }) {
  const navigate = useNavigate()
  const authState = StorageService.getAuthState()

  React.useEffect(() => {
    const checkAuth = () => {
      const state = StorageService.getAuthState()
      if (!state.isAuthenticated || state.user?.role !== 'admin') {
        navigate("/")
      }
    }

    if (!authState.isAuthenticated || authState.user?.role !== 'admin') {
      navigate("/")
    }

    window.addEventListener(`storage-update-${AUTH_KEY}`, checkAuth)
    return () => window.removeEventListener(`storage-update-${AUTH_KEY}`, checkAuth)
  }, [navigate, authState.isAuthenticated, authState.user?.role])

  if (authState.isAuthenticated && authState.user?.role === 'admin') {
    return <>{children}</>
  }

  return null
}
