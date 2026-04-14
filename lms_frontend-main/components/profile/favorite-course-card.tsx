"use client"

import * as React from "react"
import { Heart } from "lucide-react"
import { cn } from "@/lib/utils"

interface FavoriteCourseCardProps {
  id: string
  title: string
  instructor: string
  imageUrl?: string
  isFavorite?: boolean
  onFavoriteToggle?: (id: string) => void
}

export function FavoriteCourseCard({
  id,
  title,
  instructor,
  imageUrl,
  isFavorite = true,
  onFavoriteToggle,
}: FavoriteCourseCardProps) {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onFavoriteToggle?.(id)
  }

  return (
    <div className="group relative rounded-2xl border border-surface-dim bg-surface-container-lowest overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary/20 cursor-pointer ambient-shadow">
      <div className="relative p-6 min-h-[168px]">
        {/* Image placeholder (top-right) */}
        <div className="absolute top-6 right-6 w-28 h-16 rounded-xl bg-surface-container-high border border-surface-dim overflow-hidden shadow-sm">
          {imageUrl ? (
            <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[10px] text-secondary font-semibold uppercase tracking-wider">
              Preview
            </div>
          )}

          {/* Heart icon overlay */}
          <button
            onClick={handleFavoriteClick}
            className={cn(
              "absolute top-1.5 right-1.5 p-1.5 rounded-full bg-surface/80 backdrop-blur-sm transition-colors shadow-sm",
              isFavorite
                ? "text-red-500 hover:text-red-600"
                : "text-secondary hover:text-red-500"
            )}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart
              className={cn("h-4 w-4", isFavorite && "fill-current")}
            />
          </button>
        </div>

        {/* Content */}
        <div className="pr-36">
          <h3 className="font-bold font-headline text-primary mb-2 line-clamp-2 leading-snug">
            {title}
          </h3>
          <p className="text-sm font-medium text-secondary">
            {instructor}
          </p>
        </div>
      </div>
    </div>
  )
}
