"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { StorageHub, AUTH_KEY } from "@/lib/storage-hub"

interface ProtectedRouteProps {
  children: React.ReactNode
  fallbackPath?: string
}

export function ProtectedRoute({ 
  children, 
  fallbackPath = "/auth" 
}: ProtectedRouteProps) {
  const router = useRouter()
  const [isHydrated, setIsHydrated] = React.useState(false)
  const [authState, setAuthState] = React.useState(StorageHub.getAuthState())

  React.useEffect(() => {
    const handleUpdate = () => {
      const state = StorageHub.getAuthState()
      setAuthState(state)
      if (!state.isAuthenticated) {
        router.push(fallbackPath)
      }
    }

    if (!StorageHub.getAuthState().isAuthenticated) {
      router.push(fallbackPath)
    }

    setIsHydrated(true)
    window.addEventListener(`storage-update-${AUTH_KEY}`, handleUpdate)
    return () => window.removeEventListener(`storage-update-${AUTH_KEY}`, handleUpdate)
  }, [router, fallbackPath])

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
