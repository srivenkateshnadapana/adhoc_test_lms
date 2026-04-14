"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface LinearProgressProps {
  percentage: number
  className?: string
  showLabel?: boolean
}

export function LinearProgress({ percentage, className, showLabel = true }: LinearProgressProps) {
  const [animatedPercentage, setAnimatedPercentage] = React.useState(0)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPercentage(percentage)
    }, 100)
    return () => clearTimeout(timer)
  }, [percentage])

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="flex-1 h-2 bg-[#1E3A5F] rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-700 ease-out"
          style={{ width: `${animatedPercentage}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-sm text-muted-foreground w-10 text-right">
          {animatedPercentage}%
        </span>
      )}
    </div>
  )
}
