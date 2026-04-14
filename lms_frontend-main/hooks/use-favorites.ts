'use client'

import * as React from 'react'

const DEFAULT_STORAGE_KEY = 'lms-favorites'

export function useFavorites(options?: {
  storageKey?: string
  initialIds?: string[]
}) {
  const storageKey = options?.storageKey ?? DEFAULT_STORAGE_KEY
  const initialIds = options?.initialIds ?? []
  const initialIdsRef = React.useRef<string[]>(initialIds)

  const [favorites, setFavorites] = React.useState<Set<string>>(
    () => new Set(initialIds)
  )
  const [isHydrated, setIsHydrated] = React.useState(false)

  // Load favorites from localStorage on mount
  React.useEffect(() => {
    if (typeof window === 'undefined') return

    try {
      const stored = window.localStorage.getItem(storageKey)
      if (stored) {
        const parsed = JSON.parse(stored) as string[]
        setFavorites(new Set(parsed))
      } else if (initialIdsRef.current.length) {
        setFavorites(new Set(initialIdsRef.current))
      }
    } catch {
      if (initialIdsRef.current.length) {
        setFavorites(new Set(initialIdsRef.current))
      }
    }
    setIsHydrated(true)
  }, [storageKey])

  // Persist favorites to localStorage whenever they change
  React.useEffect(() => {
    if (!isHydrated || typeof window === 'undefined') return
    try {
      window.localStorage.setItem(
        storageKey,
        JSON.stringify(Array.from(favorites))
      )
    } catch {
      // Ignore write errors (e.g. private mode)
    }
  }, [favorites, isHydrated, storageKey])

  const toggleFavorite = React.useCallback((id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }, [])

  const isFavorite = React.useCallback(
    (id: string) => favorites.has(id),
    [favorites]
  )

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    isHydrated,
  }
}

