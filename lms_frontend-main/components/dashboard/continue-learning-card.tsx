import { GlassCard } from "@/components/lms"
import { LinearProgress } from "./linear-progress"
import { cn } from "@/lib/utils"

interface ContinueLearningCardProps {
  title: string
  currentModule: number
  totalModules: number
  progress: number
  className?: string
}

export function ContinueLearningCard({
  title,
  currentModule,
  totalModules,
  progress,
  className,
}: ContinueLearningCardProps) {
  return (
    <GlassCard className={cn("p-4 flex gap-4", className)}>
      {/* Course thumbnail placeholder */}
      <div className="w-24 h-20 rounded-md bg-[#1E3A5F] flex items-center justify-center flex-shrink-0">
        <div className="w-12 h-8 border-2 border-primary/50 rounded" />
      </div>
      
      {/* Course info */}
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-foreground truncate">{title}</h4>
        <p className="text-sm text-muted-foreground mb-3">
          Module {currentModule} of {totalModules}
        </p>
        <LinearProgress percentage={progress} />
      </div>
    </GlassCard>
  )
}
