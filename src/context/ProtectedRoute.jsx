import * as React from "react"
import { useNavigate } from "react-router-dom"
import { StorageService, AUTH_KEY } from "../services/storage"

export function ProtectedRoute({ 
  children, 
  fallbackPath = "/auth" 
}) {
  const navigate = useNavigate()
  const authState = StorageService.getAuthState()

  React.useEffect(() => {
    const handleUpdate = () => {
      const state = StorageService.getAuthState()
      if (!state.isAuthenticated) {
        navigate(fallbackPath)
      }
    }

    if (!authState.isAuthenticated) {
      navigate(fallbackPath)
    }

    window.addEventListener(`storage-update-${AUTH_KEY}`, handleUpdate)
    return () => window.removeEventListener(`storage-update-${AUTH_KEY}`, handleUpdate)
  }, [navigate, fallbackPath, authState.isAuthenticated])

  if (authState.isAuthenticated) {
    return <>{children}</>
  }

  return null
}
