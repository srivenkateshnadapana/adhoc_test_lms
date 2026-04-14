"use client"

import * as React from "react"
import { CourseEnrollButton } from "@/components/lms"
import { CheckCircle2, PlayCircle, Clock, BarChart, Shield, Globe, ArrowLeft, Loader2 } from "lucide-react"
import { notFound, useRouter } from "next/navigation"
import Link from "next/link"
import { StorageHub } from "@/lib/storage-hub"
import { toast } from "sonner"

export default function CourseDetailPage({ params }: { params: any }) {
  const router = useRouter()
  const [course, setCourse] = React.useState<any>(null)
  const [loading, setLoading] = React.useState(true)
  
  // Handling asynchronous params in Next.js 15+
  const [resolvedParams, setResolvedParams] = React.useState<{courseId: string} | null>(null)

  React.useEffect(() => {
    params.then((p: any) => setResolvedParams(p))
  }, [params])

  React.useEffect(() => {
    if (!resolvedParams) return

    const rawId = resolvedParams.courseId.replace('course-', '')
    const fetchCourse = async () => {
      const data = await StorageHub.getCourseById(rawId)
      if (data) {
        setCourse(data)
      } else {
        toast.error("Course not found in the tactical archives.")
      }
      setLoading(false)
    }
    fetchCourse()
  }, [resolvedParams])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-surface pt-24 text-center">
        <h1 className="text-4xl font-headline font-bold text-primary mb-4">404: Payload Not Found</h1>
        <p className="text-secondary mb-8">The requested course protocol does not exist in our curriculum.</p>
        <Link href="/catalog" className="text-primary font-bold hover:underline underline-offset-4">Return to Command Center (Catalog)</Link>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-surface relative overflow-hidden text-on-surface pt-24 pb-24">
      {/* Ambience */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <Link href="/catalog" className="inline-flex items-center gap-2 text-secondary hover:text-primary transition-colors mb-8 font-semibold">
          <ArrowLeft className="w-4 h-4" /> Back to Catalog
        </Link>
        
        {/* Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-4">
          
          {/* Main Info */}
          <div className="lg:col-span-2">
            <div className="flex gap-4 items-center mb-6">
              <span className="bg-surface-container-high text-primary px-3 py-1 rounded-full text-xs font-bold border border-surface-dim uppercase tracking-widest shadow-sm">
                {course.category || "Cybersecurity"}
              </span>
              <span className="text-secondary text-sm flex items-center gap-1.5 font-semibold capitalize">
                <BarChart className="w-4 h-4" /> {course.level || "Modern"} Level
              </span>
              <span className="text-secondary text-sm flex items-center gap-1.5 font-bold">
                <span className="material-symbols-outlined text-yellow-500 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span> {(course.rating || 4.8).toFixed(1)}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-headline font-extrabold text-primary mb-6 leading-[1.1]">
              {course.title}
            </h1>
            <p className="text-xl text-on-surface-variant mb-8 leading-relaxed max-w-2xl">
              {course.description}
            </p>
            
            <div className="flex flex-wrap gap-6 text-sm text-secondary mb-10 font-medium">
              <div className="flex items-center gap-2"><Clock className="w-5 h-5 text-primary" /> {course.durationHours || 20} Hours of Content</div>
              <div className="flex items-center gap-2"><Shield className="w-5 h-5 text-primary" /> Hands-on Labs</div>
              <div className="flex items-center gap-2"><Globe className="w-5 h-5 text-primary" /> 100% Online, Self-paced</div>
            </div>
            
            {/* Curriculum Architecture (Modules) */}
            <div className="bg-surface-container-lowest border border-surface-dim p-10 rounded-[2rem] mt-12 shadow-lg ambient-shadow">
              <h2 className="text-2xl font-headline font-bold mb-8 text-primary">Syllabus Framework</h2>
              <div className="space-y-6">
                {(course.modules || []).map((module: any, i: number) => (
                  <div key={module.id || i} className="border-b border-surface-dim pb-4 last:border-0">
                    <h3 className="text-lg font-bold text-primary mb-3 flex items-center gap-3">
                      <span className="bg-surface-container text-xs w-6 h-6 flex items-center justify-center rounded-full text-secondary">{i+1}</span>
                      {module.title}
                    </h3>
                    <p className="text-sm text-secondary mb-4 ml-9 italic">{module.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-9">
                      {(module.lessons || []).map((lesson: any, j: number) => (
                        <div key={lesson.id || j} className="flex items-center gap-2 text-sm text-secondary hover:text-primary transition-colors cursor-pointer group">
                          <PlayCircle className="w-4 h-4 text-primary/60 group-hover:text-primary" />
                          <span>{lesson.title}</span>
                          <span className="text-[10px] opacity-60 ml-auto">{lesson.duration || '15:00'}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                {(!course.modules || course.modules.length === 0) && (
                  <p className="text-secondary italic">Core curriculum protocols are being finalized for this asset.</p>
                )}
              </div>
            </div>
          </div>
          
          {/* Checkout Card */}
          <div className="lg:col-span-1">
            <div className="bg-surface-container-lowest border border-surface-dim rounded-[2rem] p-8 sticky top-28 shadow-2xl ambient-shadow">
              {/* Fake Video Preview */}
              <div className="w-full aspect-video bg-surface-container-high rounded-xl mb-8 flex items-center justify-center cursor-pointer group relative overflow-hidden border border-surface-dim">
                {course.thumbnail && <img src={course.thumbnail} className="absolute inset-0 w-full h-full object-cover opacity-60" alt="" />}
                <div className="absolute inset-0 bg-primary/20 opacity-40 group-hover:opacity-60 transition-opacity" />
                <PlayCircle className="w-16 h-16 text-white/80 group-hover:text-white group-hover:scale-110 transition-all z-10 drop-shadow-lg" />
                <span className="absolute bottom-3 right-3 bg-surface/90 text-primary text-xs px-2 py-1 rounded shadow-sm font-bold tracking-wider uppercase">PREVIEW</span>
              </div>
              
              <div className="text-5xl font-headline font-extrabold text-primary mb-3 tracking-tight">₹{course.prices?.['1month'] || course.price_1month || 499}</div>
              <p className="text-secondary text-sm mb-8 leading-relaxed">Full lifetime access. Includes future updates and 30-day money-back guarantee.</p>
              
              <CourseEnrollButton courseId={course.id} className="w-full h-14 text-lg font-bold signature-gradient text-white shadow-xl mb-6 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-transform" />
              
              <div className="text-center text-xs text-secondary mt-6 pt-6 border-t border-surface-dim flex flex-col gap-2">
                <span className="font-semibold text-primary">Join 14,000+ professionals</span>
                <span>Instructed by {course.instructor || "Platform Specialist"}</span>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </main>
  )
}
