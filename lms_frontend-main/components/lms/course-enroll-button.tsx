"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { LmsButton } from "./lms-button"
import { toast } from "sonner"
import { CheckCircle2, Loader2 } from "lucide-react"
import { StorageHub, AUTH_KEY, ENROLLMENTS_KEY } from "@/lib/storage-hub"

interface CourseEnrollButtonProps {
  courseId: string
  className?: string
}

export function CourseEnrollButton({ courseId, className }: CourseEnrollButtonProps) {
  const router = useRouter()
  const [authState, setAuthState] = React.useState(StorageHub.getAuthState())
  const [isEnrolled, setIsEnrolled] = React.useState(StorageHub.isEnrolled(courseId))
  const [loading, setLoading] = React.useState(false)
  const [isHydrated, setIsHydrated] = React.useState(false)

  React.useEffect(() => {
    const handleAuthUpdate = () => {
      setAuthState(StorageHub.getAuthState())
    }
    const handleEnrollUpdate = () => {
      setIsEnrolled(StorageHub.isEnrolled(courseId))
    }

    setIsHydrated(true)
    window.addEventListener(`storage-update-${AUTH_KEY}`, handleAuthUpdate)
    window.addEventListener(`storage-update-${ENROLLMENTS_KEY}`, handleEnrollUpdate)
    
    return () => {
      window.removeEventListener(`storage-update-${AUTH_KEY}`, handleAuthUpdate)
      window.removeEventListener(`storage-update-${ENROLLMENTS_KEY}`, handleEnrollUpdate)
    }
  }, [courseId])

  const handleClick = async () => {
    if (!authState.isAuthenticated) {
      toast.info("Please login to enroll!")
      router.push(`/auth?redirect=/course/${courseId}`)
      return
    }

    if (isEnrolled) {
      router.push("/dashboard")
      return
    }

    setLoading(true)
    await StorageHub.enroll(courseId)
    setLoading(false)
    setIsEnrolled(true)

    toast.success("Successfully Enrolled!", {
      description: "You have securely boarded the course.",
      icon: <CheckCircle2 className="w-5 h-5 text-green-500" />
    })
    
    router.push("/dashboard")
  }

  if (!isHydrated) return (
    <LmsButton variant="primary" className={className} disabled>
      INITIALIZING...
    </LmsButton>
  )

  if (isEnrolled) return (
    <LmsButton variant="outline" className={className} onClick={handleClick}>
      View In Dashboard
    </LmsButton>
  )

  return (
    <LmsButton variant="primary" className={className} onClick={handleClick} disabled={loading}>
      {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      {loading ? "PROCESSING..." : "Enroll Now"}
    </LmsButton>
  )
}
