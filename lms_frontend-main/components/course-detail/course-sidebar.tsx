"use client"

import { BookOpen, Clock, Award, Infinity } from "lucide-react"
import { GlassCard } from "@/components/lms"
import { LmsButton } from "@/components/lms"

interface CourseSidebarProps {
  price: number
  originalPrice: number
  moduleCount: number
  duration: string
  hasCertificate: boolean
  hasLifetimeAccess: boolean
  onEnroll?: () => void
  onWishlist?: () => void
}

export function CourseSidebar({
  price,
  originalPrice,
  moduleCount,
  duration,
  hasCertificate,
  hasLifetimeAccess,
  onEnroll,
  onWishlist,
}: CourseSidebarProps) {
  const features = [
    { icon: BookOpen, label: `${moduleCount} Modules` },
    { icon: Clock, label: duration },
    ...(hasCertificate ? [{ icon: Award, label: "Certificate" }] : []),
    ...(hasLifetimeAccess ? [{ icon: Infinity, label: "Lifetime Access" }] : []),
  ]

  return (
    <div className="sticky top-20">
      <GlassCard className="shadow-2xl">
        {/* Pricing */}
        <div className="mb-6">
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-foreground">
              ${price.toFixed(2)}
            </span>
            {originalPrice > price && (
              <span className="text-lg text-muted-foreground line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3 mb-6">
          <LmsButton
            variant="primary"
            size="lg"
            className="w-full"
            onClick={onEnroll}
          >
            Enroll Now
          </LmsButton>
          <LmsButton
            variant="outline"
            size="lg"
            className="w-full"
            onClick={onWishlist}
          >
            Add to Wishlist
          </LmsButton>
        </div>

        {/* Course Features */}
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-3 text-sm text-muted-foreground">
              <feature.icon className="h-4 w-4" />
              <span>{feature.label}</span>
            </li>
          ))}
        </ul>
      </GlassCard>
    </div>
  )
}
