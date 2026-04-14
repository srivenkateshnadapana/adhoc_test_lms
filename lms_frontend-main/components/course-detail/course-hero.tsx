"use client"

import { Star } from "lucide-react"

interface CourseHeroProps {
  title: string
  instructor: string
  rating: number
  studentCount: number
  level: "Beginner" | "Intermediate" | "Advanced"
}

export function CourseHero({
  title,
  instructor,
  rating,
  studentCount,
  level,
}: CourseHeroProps) {
  const levelColors = {
    Beginner: "bg-emerald-500",
    Intermediate: "bg-amber-500",
    Advanced: "bg-emerald-500",
  }

  return (
    <section className="rounded-lg bg-[#111B2E] border border-border/50 p-8">
      <h1 className="text-3xl font-bold text-foreground mb-3 text-balance">
        {title}
      </h1>
      
      <div className="flex flex-wrap items-center gap-2 text-muted-foreground mb-4">
        <span>by {instructor}</span>
        <span className="text-border">|</span>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < Math.floor(rating)
                  ? "fill-amber-400 text-amber-400"
                  : "fill-muted text-muted"
              }`}
            />
          ))}
          <span className="ml-1">{rating}</span>
        </div>
        <span className="text-border">|</span>
        <span>{studentCount.toLocaleString()} students</span>
      </div>

      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white ${levelColors[level]}`}
      >
        {level}
      </span>
    </section>
  )
}
