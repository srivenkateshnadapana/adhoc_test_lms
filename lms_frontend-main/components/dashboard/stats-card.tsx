import { cn } from "@/lib/utils"

interface StatsCardProps {
  value: number | string
  label: string
  color?: "blue" | "orange" | "green" | "purple"
  className?: string
}

const colorMap = {
  blue: "text-blue-500",
  orange: "text-orange-500",
  green: "text-green-500",
  purple: "text-purple-500",
}

export function StatsCard({ value, label, color = "blue", className }: StatsCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border/50 bg-[#0D1F3C] p-6 transition-all duration-200 hover:border-border",
        className
      )}
    >
      <div className={cn("text-4xl font-bold mb-1", colorMap[color])}>
        {value}
      </div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  )
}
