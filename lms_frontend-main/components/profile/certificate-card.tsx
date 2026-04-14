"use client"

import { LmsButton } from "@/components/lms"
import { Award } from "lucide-react"

interface CertificateCardProps {
  id: string
  title: string
  completedDate: string
  certificateId: string
  onDownload?: (id: string) => void
}

export function CertificateCard({
  id,
  title,
  completedDate,
  certificateId,
  onDownload,
}: CertificateCardProps) {
  return (
    <div className="rounded-2xl border border-surface-dim bg-surface-container-lowest p-6 flex gap-6 ambient-shadow hover:shadow-xl transition-shadow group">
      {/* Icon */}
      <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-surface-container-high border border-surface-dim flex items-center justify-center group-hover:bg-primary/5 transition-colors">
        <Award className="w-8 h-8 text-primary" />
      </div>

      {/* Certificate Info */}
      <div className="flex-1 flex flex-col justify-center">
        <h3 className="font-bold font-headline text-primary mb-1 text-lg line-clamp-1">{title}</h3>
        <p className="text-sm font-medium text-secondary mb-1">
          Completed: <span className="text-primary">{completedDate}</span>
        </p>
        <p className="text-xs text-secondary font-mono mb-4 bg-surface-container-high border border-surface-dim px-2 py-0.5 rounded w-fit">
          ID: {certificateId}
        </p>
        <button
          onClick={() => onDownload?.(id)}
          className="text-sm font-bold signature-gradient text-white px-5 py-2 rounded-lg hover:opacity-90 transition-opacity w-fit shadow-md"
        >
          Download PDF
        </button>
      </div>
    </div>
  )
}
