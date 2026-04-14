"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ProgressCircleProps {
  percentage: number
  size?: number
  strokeWidth?: number
  className?: string
  showPercentage?: boolean
  color?: string
}

export function ProgressCircle({
  percentage,
  size = 80,
  strokeWidth = 6,
  className,
  showPercentage = true,
  color = "#3B82F6",
}: ProgressCircleProps) {
  const [animatedPercentage, setAnimatedPercentage] = React.useState(0)
  
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDashoffset = circumference - (animatedPercentage / 100) * circumference

  // Animate on mount
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPercentage(percentage)
    }, 100)
    return () => clearTimeout(timer)
  }, [percentage])

  // Determine color based on percentage if not specified
  const getColor = () => {
    if (percentage === 100) return "#22C55E" // Green for complete
    if (percentage >= 70) return "#3B82F6" // Blue
    if (percentage >= 40) return "#8B5CF6" // Purple
    return "#3B82F6" // Default blue
  }

  const strokeColor = color || getColor()

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#1E3A5F"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      {showPercentage && (
        <span className="absolute text-sm font-semibold text-foreground">
          {Math.round(animatedPercentage)}%
        </span>
      )}
    </div>
  )
}
