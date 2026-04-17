import * as React from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { CheckCircle2, PlayCircle, Clock, BarChart, Shield, Globe, ArrowLeft, ArrowRight, Loader2, Star, TrendingUp } from "lucide-react"
import { StorageService } from "../../services/storage"

export default function CourseDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [course, setCourse] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  const [isEnrolled, setIsEnrolled] = React.useState(false)

  React.useEffect(() => {
    const fetchCourse = () => {
      // Ensure ID is handled correctly for both string and number lookups
      const data = StorageService.getCourseById(String(id))
      console.log('Fetching course data:', data)
      if (data) {
        setCourse(data)
        setIsEnrolled(StorageService.isEnrolled(String(id)))
      }
      setLoading(false)
    }
    fetchCourse()
  }, [id])

  const handleEnroll = () => {
    const auth = StorageService.getAuthState()
    if (!auth.isAuthenticated) {
      navigate("/auth")
      return
    }
    StorageService.enroll(String(id))
    setIsEnrolled(true)
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
      <div className="min-h-screen flex flex-col items-center justify-center bg-surface p-8 text-center">
        <h1 className="text-4xl font-headline font-bold text-primary mb-4">Course Protocol Missing</h1>
        <p className="text-secondary max-w-sm mx-auto mb-8 font-medium">The requested identifier does not match any current active curriculum in our archives.</p>
        <Link to="/catalog" className="px-8 py-3 signature-gradient text-white rounded-xl font-bold">Return to Catalog</Link>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-surface">
      {/* Dynamic Hero Section */}
      <section className="relative h-[600px] lg:h-[700px] overflow-hidden">
        <img 
          src={course.imageUrl || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1600&auto=format&fit=crop&q=80"} 
          className="w-full h-full object-cover" 
          alt={course.title} 
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
        
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-8 w-full mt-24 lg:mt-32">
            <Link to="/catalog" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-all font-bold text-xs uppercase tracking-[0.2em] mb-8">
              <ArrowLeft className="w-4 h-4" /> Back to Curriculum
            </Link>
            <div className="max-w-3xl">
              <div className="flex items-center gap-4 mb-6">
                <span className="bg-white/10 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/20">
                  {course.category || "Professional Development"}
                </span>
                <span className="flex items-center gap-1.5 text-primary-fixed font-bold text-sm">
                  <Star className="w-4 h-4 fill-current" />
                  {course.rating || "4.9"} (2.4k Reviews)
                </span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-headline font-extrabold text-white mb-8 tracking-tighter leading-[1.1] italic">
                {course.title}
              </h1>
              <p className="text-xl text-white/70 leading-relaxed font-medium max-w-2xl line-clamp-3">
                {course.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content & Sidebar */}
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-16 -mt-24 lg:-mt-32 relative z-20 pb-24">
        {/* Course Details */}
        <div className="lg:col-span-8 space-y-12">
          {/* Metrics Card */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Clock, label: "Duration", value: `${course.durationHours || 20} Hours` },
              { icon: BarChart, label: "Experience", value: course.level || "Intermediate" },
              { icon: Shield, label: "Certification", value: "Verified Profile" },
              { icon: TrendingUp, label: "ROI", value: "Career Acceleration" }
            ].map((metric, i) => (
              <div key={metric.label} className="bg-surface-container-lowest p-6 rounded-[2rem] border border-surface-dim/20 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${i * 100}ms` }}>
                <metric.icon className="w-6 h-6 text-primary mb-4" />
                <p className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-1">{metric.label}</p>
                <p className="text-primary font-headline font-bold text-sm leading-tight">{metric.value}</p>
              </div>
            ))}
          </div>

          <div className="bg-surface-container-lowest p-10 rounded-[3rem] shadow-xl shadow-primary/5 border border-surface-dim/20">
            <h2 className="text-3xl font-headline font-bold text-primary mb-8 italic">Curriculum Intent</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {(course.outcomes || [
                "Master industry-standard frameworks",
                "Execute practical labs under guidance",
                "Optimize workflow for scale",
                "Produce professional-grade deliverables"
              ]).map((outcome, i) => (
                <div key={i} className="flex gap-4 items-start group">
                  <div className="w-6 h-6 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 mt-1 group-hover:bg-primary transition-colors">
                    <CheckCircle2 className="w-4 h-4 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <p className="text-on-surface-variant font-medium leading-relaxed">{outcome}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Sidebar */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit">
          <div className="bg-surface-container-lowest/80 backdrop-blur-2xl rounded-[3rem] p-10 border border-white/40 shadow-2xl ambient-shadow">
            <div className="mb-8">
              <span className="text-[10px] font-bold text-secondary uppercase tracking-[0.3em] block mb-2">Access Investment</span>
              <div className="text-6xl font-headline font-extrabold text-primary tracking-tighter leading-none mb-4 italic">₹{course.price}</div>
              <p className="text-on-surface-variant text-sm font-medium leading-relaxed opacity-70 italic">
                Secure the entire curriculum profile. Complete with future protocol updates.
              </p>
            </div>

            {isEnrolled ? (
              <button 
                onClick={() => navigate(`/student/course/${id}`)}
                className="w-full py-5 rounded-2xl bg-primary text-white font-headline font-bold text-lg hover:bg-primary/90 transition-all shadow-xl flex items-center justify-center gap-3 active:scale-[0.98]"
              >
                Enter Classroom
                <PlayCircle className="w-6 h-6" />
              </button>
            ) : (
              <button 
                onClick={handleEnroll}
                className="w-full py-5 rounded-2xl signature-gradient text-white font-headline font-bold text-lg hover:opacity-90 transition-all shadow-xl flex items-center justify-center gap-3 active:scale-[0.98]"
              >
                Initiate Enrollment
                <ArrowRight className="w-6 h-6" />
              </button>
            )}

            <div className="mt-8 pt-8 border-t border-surface-dim/20 flex items-center gap-4">
              <img src={`https://i.pravatar.cc/100?u=${course.instructor}`} className="w-12 h-12 rounded-2xl object-cover shadow-sm" alt="Instructor" />
              <div>
                <p className="text-[10px] font-bold text-secondary uppercase tracking-widest leading-none mb-1">Lead Mentor</p>
                <p className="text-primary font-headline font-extrabold text-sm">{course.instructor}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
