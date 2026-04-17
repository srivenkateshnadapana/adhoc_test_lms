import * as React from "react"
import { ProtectedRoute } from "../../context/ProtectedRoute"
import { BookOpen, GraduationCap, LayoutDashboard, Clock, PlayCircle, Trophy, Target, ArrowRight } from "lucide-react"
import { StorageService, ENROLLMENTS_KEY } from "../../services/storage"
import { Link, useNavigate } from "react-router-dom"

export default function Dashboard() {
  return (
    <ProtectedRoute fallbackPath="/auth">
      <DashboardContent />
    </ProtectedRoute>
  )
}

function DashboardContent() {
  const [courses, setCourses] = React.useState([])
  const [isHydrated, setIsHydrated] = React.useState(false)
  const navigate = useNavigate()
  const user = StorageService.getUser()

  React.useEffect(() => {
    const handleUpdate = () => {
      const ids = StorageService.getEnrollments()
      const allCourses = StorageService.getCourses()
      setCourses(allCourses.filter(c => ids.includes(c.id)))
    }

    handleUpdate()
    setIsHydrated(true)
    window.addEventListener(`storage-update-${ENROLLMENTS_KEY}`, handleUpdate)
    return () => window.removeEventListener(`storage-update-${ENROLLMENTS_KEY}`, handleUpdate)
  }, [])

  const stats = [
    { label: "Active Courses", value: courses.length.toString(), icon: BookOpen, accent: "primary" },
    { label: "Completion protocol", value: "0", icon: GraduationCap, accent: "secondary" },
    { label: "Hours Learned", value: (courses.length * 12).toString(), icon: Clock, accent: "primary" },
    { label: "Reward Points", value: "1,250", icon: Trophy, accent: "secondary" },
  ]

  return (
    <main className="min-h-screen bg-surface pt-24 pb-20 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <div>
              <span className="text-[10px] font-bold text-outline uppercase tracking-[0.4em] block mb-2">{new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</span>
              <h1 className="text-5xl lg:text-6xl font-headline font-extrabold text-primary tracking-tighter italic">
                Welcome, {user?.name || "Operator"}
              </h1>
              <p className="text-on-surface-variant text-lg font-medium opacity-60 mt-2">Accessing your tactical learning dashboard.</p>
            </div>
            <div className="bg-surface-container-low px-6 py-4 rounded-2xl border border-surface-dim/20 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full signature-gradient flex items-center justify-center text-white shadow-lg">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-secondary uppercase tracking-widest leading-none mb-1">Global Standing</p>
                <p className="text-primary font-headline font-bold">Top 5% of Scholars</p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Bento Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="bg-surface-container-lowest p-8 rounded-[2.5rem] border border-surface-dim/20 shadow-xl shadow-primary/5 hover:scale-[1.02] transition-all group">
                <div className={`w-12 h-12 rounded-2xl ${stat.accent === 'primary' ? 'bg-primary-fixed text-primary' : 'bg-surface-container-high text-secondary'} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <p className="text-[10px] font-bold text-outline uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                <p className="text-4xl font-headline font-extrabold text-primary tracking-tighter">{stat.value}</p>
              </div>
            )
          })}
        </section>

        {/* Active Courses */}
        <section>
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-headline font-bold text-primary italic">Active Protocols</h2>
            <Link to="/catalog" className="text-xs font-bold text-primary uppercase tracking-[0.2em] border-b-2 border-primary pb-1 hover:opacity-70 transition-all">Explore More</Link>
          </div>

          {!isHydrated ? (
             <div className="h-64 flex items-center justify-center">
               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
             </div>
          ) : courses.length === 0 ? (
            <div className="bg-white rounded-[3rem] p-16 text-center border-2 border-dashed border-surface-dim shadow-inner">
              <BookOpen className="w-16 h-16 text-surface-dim mx-auto mb-6" />
              <h3 className="text-2xl font-headline font-bold text-primary mb-4">No Active Sessions</h3>
              <p className="text-on-surface-variant max-w-sm mx-auto mb-10 font-medium">Your learning profile is currently idle. Access the global catalog to initialize your first curriculum.</p>
              <Link to="/catalog" className="px-10 py-5 signature-gradient text-white rounded-2xl font-bold text-lg shadow-xl inline-flex items-center gap-2 group">
                Initialize Journey
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {courses.map((course) => (
                <div 
                  key={course.id} 
                  className="bg-white rounded-[3rem] overflow-hidden border border-surface-dim/20 shadow-xl hover:shadow-2xl transition-all group flex flex-col sm:flex-row h-full"
                >
                  <div className="w-full sm:w-48 h-48 sm:h-auto shrink-0 relative overflow-hidden">
                    <img src={course.imageUrl || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800"} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={course.title} />
                    <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors"></div>
                  </div>
                  <div className="p-8 flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <span className="bg-surface-container-high text-secondary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">{course.category}</span>
                        <span className="text-[10px] font-bold text-primary/40 uppercase tracking-widest">{course.level} Level</span>
                      </div>
                      <h3 className="text-2xl font-headline font-bold text-primary mb-4 leading-tight group-hover:text-primary-container transition-colors">
                        {course.title}
                      </h3>
                    </div>
                    <div className="space-y-6 pt-6 border-t border-surface-dim/10">
                      <div className="flex justify-between items-center text-[10px] font-bold text-secondary uppercase tracking-[0.2em]">
                        <span>Session Progress</span>
                        <span>0%</span>
                      </div>
                      <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: '0%' }}></div>
                      </div>
                      <button 
                        onClick={() => navigate(`/student/course/${course.id}`)}
                        className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-sm hover:bg-primary/90 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                      >
                        Resume Operation
                        <PlayCircle className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
