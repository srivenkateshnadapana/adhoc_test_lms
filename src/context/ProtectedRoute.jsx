import * as React from "react"
import { useNavigate } from "react-router-dom"
import { StorageService, AUTH_KEY } from "../services/storage"

export function ProtectedRoute({ 
  children, 
  fallbackPath = "/auth" 
}) {
  const navigate = useNavigate()
  const [isHydrated, setIsHydrated] = React.useState(false)
  const [authState, setAuthState] = React.useState(StorageService.getAuthState())

  React.useEffect(() => {
    const handleUpdate = () => {
      const state = StorageService.getAuthState()
      setAuthState(state)
      if (!state.isAuthenticated) {
        navigate(fallbackPath)
      }
    }

    if (!StorageService.getAuthState().isAuthenticated) {
      navigate(fallbackPath)
    }

    setIsHydrated(true)
    window.addEventListener(`storage-update-${AUTH_KEY}`, handleUpdate)
    return () => window.removeEventListener(`storage-update-${AUTH_KEY}`, handleUpdate)
  }, [navigate, fallbackPath])

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="font-headline font-bold text-primary tracking-tighter uppercase">Initializing...</p>
        </div>
      </div>
    )
  }

  if (authState.isAuthenticated) {
    return <>{children}</>
  }

  return null
}
