import * as React from "react"
import { ChevronDown, SlidersHorizontal, Filter } from "lucide-react"

const sortOptions = [
  { id: "popular", label: "Most Popular" },
  { id: "newest", label: "Recently Initialized" },
  { id: "price-low", label: "Price: Standard" },
  { id: "price-high", label: "Price: Exclusive" },
  { id: "rating", label: "Highest Clearance" },
]

const levelOptions = [
  { id: "all", label: "Universal" },
  { id: "beginner", label: "Fundamental" },
  { id: "intermediate", label: "Operational" },
  { id: "advanced", label: "Strategic" },
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
  const currentLevel = levelOptions.find((o) => o.id === level)?.label || "Universal"

  return (
    <div className="bg-surface pb-12 px-8">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-6">
        
        {/* Sort Node Dropdown */}
        <div className="relative group min-w-[240px]">
          <button
            onClick={() => {
              setSortOpen(!sortOpen)
              setLevelOpen(false)
            }}
            className={`w-full flex items-center justify-between px-8 py-4 rounded-[1.5rem] border transition-all ${
              sortOpen ? 'bg-surface-container-high border-primary ring-4 ring-primary/5' : 'bg-white border-surface-dim/20 hover:bg-surface-container-low'
            }`}
          >
            <div className="flex items-center gap-3">
              <SlidersHorizontal className="w-4 h-4 text-primary opacity-50" />
              <span className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em]">{currentSort}</span>
            </div>
            <ChevronDown className={`w-4 h-4 text-primary transition-transform ${sortOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {sortOpen && (
            <div className="absolute top-full left-0 mt-3 w-full bg-surface-container-low/80 backdrop-blur-2xl border border-white/20 rounded-[2rem] shadow-2xl z-50 overflow-hidden py-2 animate-in fade-in slide-in-from-top-2 duration-200">
              {sortOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => {
                    onSortChange(option.id)
                    setSortOpen(false)
                  }}
                  className={`w-full px-8 py-4 text-left text-[10px] font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-between group ${
                    sortBy === option.id ? 'text-primary bg-primary/5' : 'text-secondary hover:bg-surface-container-high hover:text-primary'
                  }`}
                >
                  {option.label}
                  {sortBy === option.id && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Level Node Dropdown */}
        <div className="relative group min-w-[200px]">
          <button
            onClick={() => {
              setLevelOpen(!levelOpen)
              setSortOpen(false)
            }}
            className={`w-full flex items-center justify-between px-8 py-4 rounded-[1.5rem] border transition-all ${
              levelOpen ? 'bg-surface-container-high border-primary ring-4 ring-primary/5' : 'bg-white border-surface-dim/20 hover:bg-surface-container-low'
            }`}
          >
            <div className="flex items-center gap-3">
              <Filter className="w-4 h-4 text-primary opacity-50" />
              <span className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em]">{currentLevel}</span>
            </div>
            <ChevronDown className={`w-4 h-4 text-primary transition-transform ${levelOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {levelOpen && (
            <div className="absolute top-full left-0 mt-3 w-full bg-surface-container-low/80 backdrop-blur-2xl border border-white/20 rounded-[2rem] shadow-2xl z-50 overflow-hidden py-2 animate-in fade-in slide-in-from-top-2 duration-200">
              {levelOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => {
                    onLevelChange(option.id)
                    setLevelOpen(false)
                  }}
                  className={`w-full px-8 py-4 text-left text-[10px] font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-between group ${
                    level === option.id ? 'text-primary bg-primary/5' : 'text-secondary hover:bg-surface-container-high hover:text-primary'
                  }`}
                >
                  {option.label}
                  {level === option.id && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
