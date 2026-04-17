import * as React from "react"
import { Link } from "react-router-dom"
import { Star, ChevronRight, Heart } from "lucide-react"

export function CourseCard({
  id,
  title,
  instructor,
  price,
  imageUrl,
  category = "Technology",
  rating = 4.9,
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
      className="group bg-surface-container-low rounded-[2rem] overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-surface-dim/20"
    >
      <div className="h-56 overflow-hidden relative">
        <img
          src={imageUrl || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60"}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <button
          onClick={handleFavoriteClick}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-surface-container-lowest/80 backdrop-blur-md shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-error text-error' : 'text-secondary opacity-60'}`} />
        </button>
      </div>

      <div className="p-8">
        <div className="flex justify-between items-center mb-4">
          <span className="bg-surface-container-highest text-on-surface-variant px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
            {category}
          </span>
          <div className="flex items-center gap-1 text-on-tertiary-container">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-bold">{rating}</span>
          </div>
        </div>

        <h3 className="text-xl font-headline font-bold text-primary mb-3 line-clamp-2">
          {title}
        </h3>
        <p className="text-on-surface-variant text-sm mb-6 font-medium">
          Instructed by <span className="text-primary font-bold">{instructor}</span>
        </p>

        <div className="flex justify-between items-center pt-6 border-t border-outline-variant/20">
          <span className="text-primary font-extrabold text-xl">${price}</span>
          <div className="text-primary font-bold flex items-center gap-1 group/btn">
            Enroll Now
            <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  )
}
