"use client"

import * as React from "react"
import { SearchFilterBar } from "@/components/catalog/search-filter-bar"
import { SortControls } from "@/components/catalog/sort-controls"
import { CatalogCourseCard } from "@/components/catalog/catalog-course-card"
import { masterCourses as courses } from "@/lib/data/courses"
import { StorageHub, FAVORITES_KEY } from "@/lib/storage-hub"

export default function CatalogPage() {
  const [courses, setCourses] = React.useState<any[]>([])
  const [searchQuery, setSearchQuery] = React.useState("")
  const [activeCategory, setActiveCategory] = React.useState("all")
  const [sortBy, setSortBy] = React.useState("popular")
  const [level, setLevel] = React.useState("all")
  const [favorites, setFavorites] = React.useState<Set<string>>(new Set(StorageHub.getFavorites()))
  const [isHydrated, setIsHydrated] = React.useState(false)

  React.useEffect(() => {
    const handleUpdate = () => {
      setFavorites(new Set(StorageHub.getFavorites()))
    }
    
    const fetchCourses = async () => {
      const data = await StorageHub.getAllCourses()
      setCourses(data)
    }

    fetchCourses()
    window.addEventListener(`storage-update-${FAVORITES_KEY}`, handleUpdate)
    setIsHydrated(true)
    return () => window.removeEventListener(`storage-update-${FAVORITES_KEY}`, handleUpdate)
  }, [])

  const handleFavoriteToggle = (id: string) => {
    StorageHub.toggleFavorite(id)
  }

  // Filter courses based on search query, category, and level
  const filteredCourses = React.useMemo(() => {
    let result = [...courses]

    // Filter by search query (searches title and instructor)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (course) =>
          course.title.toLowerCase().includes(query) ||
          course.instructor.toLowerCase().includes(query)
      )
    }

    // Filter by category
    if (activeCategory !== "all") {
      result = result.filter((course) => course.category === activeCategory)
    }

    // Filter by level
    if (level !== "all") {
      result = result.filter((course) => course.level === level)
    }

    // Sort courses
    switch (sortBy) {
      case "newest":
        result = [...result].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case "price-low":
        result = [...result].sort((a, b) => a.price - b.price)
        break
      case "price-high":
        result = [...result].sort((a, b) => b.price - a.price)
        break
      case "rating":
        result = [...result].sort((a, b) => b.rating - a.rating)
        break
      case "popular":
      default:
        break
    }

    return result
  }, [searchQuery, activeCategory, level, sortBy])

  if (!isHydrated) return null

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="pt-8 pb-4">
          <h1 className="font-headline text-4xl font-bold text-primary">
            Course Catalog
          </h1>
          <div className="h-px bg-gradient-to-r from-primary/50 to-transparent mt-4" />
        </div>

        {/* Search & Filter Bar - Sticky */}
        <SearchFilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Sort Controls */}
        <SortControls
          sortBy={sortBy}
          onSortChange={setSortBy}
          level={level}
          onLevelChange={setLevel}
        />

        {/* Course Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
          {filteredCourses.map((course) => (
            <CatalogCourseCard
              key={course.id}
              id={course.id}
              title={course.title}
              instructor={course.instructor}
              price={course.price}
              isFavorite={favorites.has(course.id)}
              onFavoriteToggle={handleFavoriteToggle}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No courses found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  )
}
