import * as React from "react"
import { Link } from "react-router-dom"
import { Heart } from "lucide-react"
import { cn } from "@/utils/cn"

export function CourseCard({
  id,
  title,
  instructor,
  price,
  imageUrl,
  isFavorite = false,
  onFavoriteToggle,
}) {
  const handleFavoriteClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    onFavoriteToggle?.(id)
  }

  return (
    <Link
      to={`/course/${id}`}
      className="group relative block rounded-lg border border-border/50 bg-card backdrop-blur-md overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30"
    >
      {/* Image Area */}
      <div className="relative aspect-video bg-surface-container-high rounded-t-lg">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
            Image
          </div>
        )}
        
        {/* Favorite Heart Button */}
        <button
          onClick={handleFavoriteClick}
          className={cn(
            "absolute top-3 right-3 p-1.5 rounded-full transition-all duration-200",
            isFavorite
              ? "text-red-400 hover:text-red-300"
              : "text-muted-foreground hover:text-red-400"
          )}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            className={cn(
              "h-5 w-5 transition-all",
              isFavorite && "fill-current"
            )}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-foreground mb-1 line-clamp-1">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground mb-3">
          {instructor}
        </p>
        <p className="text-lg font-bold text-primary">
          ${price}
        </p>
      </div>
    </Link>
  )
}
