"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { StorageHub, AUTH_KEY } from "@/lib/storage-hub"

interface AdminProtectedRouteProps {
  children: React.ReactNode
  fallbackPath?: string
}

export function AdminProtectedRoute({ 
  children, 
  fallbackPath = "/dashboard" 
}: AdminProtectedRouteProps) {
  const router = useRouter()
  const [isHydrated, setIsHydrated] = React.useState(false)
  const [isAdmin, setIsAdmin] = React.useState(false)

  React.useEffect(() => {
    const handleUpdate = () => {
      const state = StorageHub.getAuthState()
      if (!state.isAuthenticated) {
        router.push("/auth")
      } else if (state.user?.role !== 'admin') {
        router.push(fallbackPath)
      } else {
        setIsAdmin(true)
      }
    }

    const state = StorageHub.getAuthState()
    if (!state.isAuthenticated) {
      router.push("/auth")
    } else if (state.user?.role !== 'admin') {
      router.push(fallbackPath)
    } else {
      setIsAdmin(true)
    }

    setIsHydrated(true)
    window.addEventListener(`storage-update-${AUTH_KEY}`, handleUpdate)
    return () => window.removeEventListener(`storage-update-${AUTH_KEY}`, handleUpdate)
  }, [router, fallbackPath])

  if (!isHydrated || !isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="font-headline font-bold text-primary tracking-tighter uppercase">Verifying Proctor Privileges...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
