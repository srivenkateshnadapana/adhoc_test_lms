import { GlassCard } from "@/components/lms"
import { ProgressCircle } from "./progress-circle"
import { cn } from "@/lib/utils"

interface EnrolledCourseCardProps {
  title: string
  instructor: string
  progress: number
  className?: string
}

export function EnrolledCourseCard({
  title,
  instructor,
  progress,
  className,
}: EnrolledCourseCardProps) {
  return (
    <GlassCard className={cn("p-0 overflow-hidden", className)}>
      {/* Course image placeholder */}
      <div className="h-32 bg-[#1E3A5F] flex items-center justify-center">
        <div className="w-16 h-10 border-2 border-primary/30 rounded" />
      </div>
      
      {/* Course info */}
      <div className="p-4">
        <h4 className="font-semibold text-foreground mb-1">{title}</h4>
        <p className="text-sm text-muted-foreground mb-4">{instructor}</p>
        
        {/* Progress circle */}
        <div className="flex justify-center">
          <ProgressCircle percentage={progress} size={70} strokeWidth={5} />
        </div>
      </div>
    </GlassCard>
  )
}
