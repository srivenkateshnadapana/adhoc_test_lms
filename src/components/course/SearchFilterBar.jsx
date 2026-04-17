import * as React from "react"
import { Search } from "lucide-react"

const categories = [
  { id: "all", label: "All Protocols" },
  { id: "cybersecurity", label: "Cybersecurity" },
  { id: "cloud", label: "Cloud Infra" },
  { id: "aiml", label: "AI Matrix" },
  { id: "devops", label: "DevOps Ops" },
]

export function SearchFilterBar({
  searchQuery,
  onSearchChange,
  activeCategory,
  onCategoryChange,
}) {
  return (
    <div className="bg-surface pt-12 pb-8 px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-stretch lg:items-center gap-6">
        {/* Search Input Shard */}
        <div className="relative flex-1 group">
          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-outline group-focus-within:text-primary transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Search tactical archives..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-16 pr-8 py-5 bg-surface-container-low border-none rounded-[2rem] text-primary font-body font-semibold placeholder:opacity-30 focus:ring-4 focus:ring-primary/5 transition-all shadow-sm"
          />
        </div>

        {/* Category Pill Shard */}
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2 lg:pb-0 px-2 lg:px-0">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`px-8 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] whitespace-nowrap transition-all active:scale-95 ${
                activeCategory === category.id
                  ? "signature-gradient text-white shadow-xl shadow-primary/20"
                  : "bg-surface-container-high text-secondary hover:bg-surface-dim hover:text-primary"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
