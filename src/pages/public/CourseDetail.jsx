import * as React from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { CheckCircle2, PlayCircle, Clock, BarChart, Shield, Globe, ArrowLeft, Loader2 } from "lucide-react"
import { StorageService } from "../../services/storage"
import { toast } from "sonner"

export default function CourseDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [course, setCourse] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  const [isEnrolled, setIsEnrolled] = React.useState(false)

  React.useEffect(() => {
    const fetchCourse = () => {
      const data = StorageService.getCourseById(id)
      if (data) {
        setCourse(data)
        setIsEnrolled(StorageService.isEnrolled(id))
      } else {
        toast.error("Course not found in the tactical archives.")
      }
      setLoading(false)
    }
    fetchCourse()
  }, [id])

  const handleEnroll = () => {
    const auth = StorageService.getAuthState()
    if (!auth.isAuthenticated) {
      toast.error("Authentication required for enrollment.")
      navigate("/auth")
      return
    }
    StorageService.enroll(id)
    setIsEnrolled(true)
    toast.success("Enrolled successfully!")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-surface py-24 text-center">
        <h1 className="text-4xl font-headline font-bold text-primary mb-4">404: Payload Not Found</h1>
        <p className="text-secondary mb-8">The requested course protocol does not exist in our curriculum.</p>
        <Link to="/catalog" className="text-primary font-bold hover:underline underline-offset-4">Return to Catalog</Link>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-surface relative overflow-hidden text-on-surface pt-12 pb-24">
      {/* Ambience */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <Link to="/catalog" className="inline-flex items-center gap-2 text-secondary hover:text-primary transition-colors mb-8 font-semibold">
          <ArrowLeft className="w-4 h-4" /> Back to Catalog
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Info */}
          <div className="lg:col-span-2">
            <div className="flex gap-4 items-center mb-6">
              <span className="bg-surface-container-high text-primary px-3 py-1 rounded-full text-xs font-bold border border-surface-dim uppercase tracking-widest shadow-sm">
                {course.category || "Cybersecurity"}
              </span>
              <span className="text-secondary text-sm flex items-center gap-1.5 font-semibold capitalize">
                <BarChart className="w-4 h-4" /> {course.level || "Modern"} Level
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-headline font-extrabold text-primary mb-6 leading-[1.1]">
              {course.title}
            </h1>
            <p className="text-xl text-on-surface-variant mb-8 leading-relaxed max-w-2xl">
              {course.description}
            </p>
            
            <div className="flex flex-wrap gap-6 text-sm text-secondary mb-10 font-medium">
              <div className="flex items-center gap-2"><Clock className="w-5 h-5 text-primary" /> {course.durationHours || 20} Hours</div>
              <div className="flex items-center gap-2"><Shield className="w-5 h-5 text-primary" /> Hands-on Labs</div>
              <div className="flex items-center gap-2"><Globe className="w-5 h-5 text-primary" /> Online Access</div>
            </div>
            
            <div className="bg-surface-container-lowest border border-surface-dim p-8 rounded-3xl mt-12 shadow-lg ambient-shadow">
              <h2 className="text-2xl font-headline font-bold mb-6 text-primary">Course Outcomes</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(course.outcomes || []).map((outcome, i) => (
                  <div key={i} className="flex gap-3 text-secondary">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-sm">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Action Card */}
          <div className="lg:col-span-1">
            <div className="bg-surface-container-lowest border border-surface-dim rounded-3xl p-8 sticky top-28 shadow-2xl ambient-shadow">
              <div className="text-5xl font-headline font-extrabold text-primary mb-3 tracking-tight">₹{course.price || 499}</div>
              <p className="text-secondary text-sm mb-8 leading-relaxed">Full lifetime access. Includes future updates and certification.</p>
              
              {isEnrolled ? (
                <button
                  onClick={() => navigate(`/student/course/${id}`)}
                  className="w-full h-14 text-lg font-bold bg-secondary text-on-secondary rounded-xl hover:opacity-90 transition-all font-headline uppercase tracking-widest"
                >
                  Enter Classroom
                </button>
              ) : (
                <button
                  onClick={handleEnroll}
                  className="w-full h-14 text-lg font-bold signature-gradient text-white shadow-xl rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-transform font-headline uppercase tracking-widest"
                >
                  Initialize Enrollment
                </button>
              )}
              
              <div className="text-center text-xs text-secondary mt-8 pt-6 border-t border-surface-dim">
                Instructed by <span className="font-bold text-primary">{course.instructor}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
