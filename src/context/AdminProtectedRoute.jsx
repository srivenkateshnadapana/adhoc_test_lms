import * as React from "react"
import { useNavigate } from "react-router-dom"
import { StorageService, AUTH_KEY } from "../services/storage"

export function AdminProtectedRoute({ children }) {
  const navigate = useNavigate()
  const [isHydrated, setIsHydrated] = React.useState(false)
  const [authState, setAuthState] = React.useState(StorageService.getAuthState())

  React.useEffect(() => {
    const checkAuth = () => {
      const state = StorageService.getAuthState()
      setAuthState(state)
      if (!state.isAuthenticated || state.user?.role !== 'admin') {
        navigate("/")
      }
    }

    checkAuth()
    setIsHydrated(true)
    window.addEventListener(`storage-update-${AUTH_KEY}`, checkAuth)
    return () => window.removeEventListener(`storage-update-${AUTH_KEY}`, checkAuth)
  }, [navigate])

  if (!isHydrated) return null

  if (authState.isAuthenticated && authState.user?.role === 'admin') {
    return <>{children}</>
  }

  return null
}
