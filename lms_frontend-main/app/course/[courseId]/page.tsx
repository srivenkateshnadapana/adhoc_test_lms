import { CourseEnrollButton } from "@/components/lms"
import { CheckCircle2, PlayCircle, Clock, BarChart, Shield, Globe, ArrowLeft } from "lucide-react"
import { masterCourses } from "@/lib/data/courses"
import { notFound } from "next/navigation"
import Link from "next/link"

export default async function CourseDetailPage({ params }: { params: Promise<{ courseId: string }> }) {
  const resolvedParams = await params
  const rawId = resolvedParams.courseId.replace('course-', '')
  const course = masterCourses.find(c => c.id === rawId)
  
  if (!course) {
    return notFound()
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
                {course.category}
              </span>
              <span className="text-secondary text-sm flex items-center gap-1.5 font-semibold capitalize">
                <BarChart className="w-4 h-4" /> {course.level} Level
              </span>
              <span className="text-secondary text-sm flex items-center gap-1.5 font-bold">
                <span className="material-symbols-outlined text-yellow-500 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span> {course.rating.toFixed(1)}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-headline font-extrabold text-primary mb-6 leading-[1.1]">
              {course.title}
            </h1>
            <p className="text-xl text-on-surface-variant mb-8 leading-relaxed max-w-2xl">
              {course.description}
            </p>
            
            <div className="flex flex-wrap gap-6 text-sm text-secondary mb-10 font-medium">
              <div className="flex items-center gap-2"><Clock className="w-5 h-5 text-primary" /> {course.durationHours} Hours of Content</div>
              <div className="flex items-center gap-2"><Shield className="w-5 h-5 text-primary" /> Hands-on Labs</div>
              <div className="flex items-center gap-2"><Globe className="w-5 h-5 text-primary" /> 100% Online, Self-paced</div>
            </div>
            
            {/* What you'll learn */}
            <div className="bg-surface-container-lowest border border-surface-dim p-10 rounded-[2rem] mt-12 shadow-lg ambient-shadow">
              <h2 className="text-2xl font-headline font-bold mb-8 text-primary">What you'll learn</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {course.outcomes.map((item, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                    <span className="text-on-surface-variant text-base leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Checkout Card */}
          <div className="lg:col-span-1">
            <div className="bg-surface-container-lowest border border-surface-dim rounded-[2rem] p-8 sticky top-28 shadow-2xl ambient-shadow">
              {/* Fake Video Preview */}
              <div className="w-full aspect-video bg-surface-container-high rounded-xl mb-8 flex items-center justify-center cursor-pointer group relative overflow-hidden border border-surface-dim">
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <PlayCircle className="w-16 h-16 text-primary/80 group-hover:text-primary group-hover:scale-110 transition-all z-10" />
                <span className="absolute bottom-3 right-3 bg-surface/90 text-primary text-xs px-2 py-1 rounded shadow-sm font-bold tracking-wider uppercase">PREVIEW</span>
              </div>
              
              <div className="text-5xl font-headline font-extrabold text-primary mb-3 tracking-tight">${course.price}</div>
              <p className="text-secondary text-sm mb-8 leading-relaxed">Full lifetime access. Includes future updates and 30-day money-back guarantee.</p>
              
              <CourseEnrollButton courseId={course.id} className="w-full h-14 text-lg font-bold signature-gradient text-white shadow-xl mb-6 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-transform" />
              
              <div className="text-center text-xs text-secondary mt-6 pt-6 border-t border-surface-dim flex flex-col gap-2">
                <span className="font-semibold text-primary">Join 14,000+ professionals</span>
                <span>Instructed by {course.instructor}</span>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </main>
  )
}
