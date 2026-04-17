import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "../../utils/cn"

const sortOptions = [
  { id: "popular", label: "Most Popular" },
  { id: "newest", label: "Newest" },
  { id: "price-low", label: "Price: Low to High" },
  { id: "price-high", label: "Price: High to Low" },
  { id: "rating", label: "Highest Rated" },
]

const levelOptions = [
  { id: "all", label: "All" },
  { id: "beginner", label: "Beginner" },
  { id: "intermediate", label: "Intermediate" },
  { id: "advanced", label: "Advanced" },
]

export function SortControls({
  sortBy,
  onSortChange,
  level,
  onLevelChange,
}) {
  const [sortOpen, setSortOpen] = React.useState(false)
  const [levelOpen, setLevelOpen] = React.useState(false)

  const currentSort = sortOptions.find((o) => o.id === sortBy)?.label || "Most Popular"
  const currentLevel = levelOptions.find((o) => o.id === level)?.label || "All"

  return (
    <div className="flex items-center gap-4 py-4">
      {/* Sort Dropdown */}
      <div className="relative">
        <button
          onClick={() => {
            setSortOpen(!sortOpen)
            setLevelOpen(false)
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-md border border-border bg-input text-sm text-foreground hover:bg-secondary transition-colors min-w-[180px] justify-between"
        >
          <span>
            <span className="text-muted-foreground">Sort: </span>
            {currentSort}
          </span>
          <ChevronDown className={cn("h-4 w-4 transition-transform", sortOpen && "rotate-180")} />
        </button>
        {sortOpen && (
          <div className="absolute top-full left-0 mt-1 w-full bg-popover border border-border rounded-md shadow-lg z-50">
            {sortOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => {
                  onSortChange(option.id)
                  setSortOpen(false)
                }}
                className={cn(
                  "w-full px-4 py-2 text-left text-sm hover:bg-secondary transition-colors first:rounded-t-md last:rounded-b-md",
                  sortBy === option.id && "bg-primary/20 text-primary"
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Level Dropdown */}
      <div className="relative">
        <button
          onClick={() => {
            setLevelOpen(!levelOpen)
            setSortOpen(false)
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-md border border-border bg-input text-sm text-foreground hover:bg-secondary transition-colors min-w-[140px] justify-between"
        >
          <span>
            <span className="text-muted-foreground">Level: </span>
            {currentLevel}
          </span>
          <ChevronDown className={cn("h-4 w-4 transition-transform", levelOpen && "rotate-180")} />
        </button>
        {levelOpen && (
          <div className="absolute top-full left-0 mt-1 w-full bg-popover border border-border rounded-md shadow-lg z-50">
            {levelOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => {
                  onLevelChange(option.id)
                  setLevelOpen(false)
                }}
                className={cn(
                  "w-full px-4 py-2 text-left text-sm hover:bg-secondary transition-colors first:rounded-t-md last:rounded-b-md",
                  level === option.id && "bg-primary/20 text-primary"
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
