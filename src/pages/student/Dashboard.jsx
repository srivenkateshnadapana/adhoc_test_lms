import * as React from "react"
import { ProtectedRoute } from "../../context/ProtectedRoute"
import { BookOpen, GraduationCap, LayoutDashboard, Clock } from "lucide-react"
import { StorageService, ENROLLMENTS_KEY } from "../../services/storage"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

export default function Dashboard() {
  return (
    <ProtectedRoute fallbackPath="/auth">
      <DashboardContent />
    </ProtectedRoute>
  )
}

function DashboardContent() {
  const [enrolledIds, setEnrolledIds] = React.useState([])
  const [courses, setCourses] = React.useState([])
  const [isHydrated, setIsHydrated] = React.useState(false)

  React.useEffect(() => {
    const handleUpdate = () => {
      const ids = StorageService.getEnrollments()
      const allCourses = StorageService.getCourses()
      setEnrolledIds(ids)
      setCourses(allCourses.filter(c => ids.includes(c.id)))
    }

    handleUpdate()
    setIsHydrated(true)
    window.addEventListener(`storage-update-${ENROLLMENTS_KEY}`, handleUpdate)
    return () => window.removeEventListener(`storage-update-${ENROLLMENTS_KEY}`, handleUpdate)
  }, [])

  const stats = [
    { label: "Active Courses", value: isHydrated ? enrolledIds.length.toString() : "-", icon: BookOpen, color: "text-primary", bg: "bg-surface-container-high" },
    { label: "Certificates", value: "0", icon: GraduationCap, color: "text-secondary", bg: "bg-surface-container-high" },
    { label: "Hours Learned", value: isHydrated ? (enrolledIds.length * 12).toString() : "-", icon: Clock, color: "text-primary", bg: "bg-surface-container-high" },
    { label: "Achievements", value: "0", icon: LayoutDashboard, color: "text-secondary", bg: "bg-surface-container-high" },
  ]

  return (
    <main className="min-h-screen bg-surface text-on-surface relative overflow-hidden pt-8 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 border-b border-surface-dim pb-8">
          <h1 className="font-headline text-4xl font-extrabold text-primary tracking-tight">
            Learning Dashboard
          </h1>
          <p className="text-secondary mt-2 text-lg italic">
            Command Center for your professional growth protocols.
          </p>
        </motion.div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="bg-surface-container-low border border-surface-dim rounded-3xl p-6 backdrop-blur-md flex items-center justify-between group transition-all">
                <div>
                  <div className="text-secondary text-[10px] font-bold uppercase tracking-widest mb-1">{stat.label}</div>
                  <div className="text-4xl font-headline font-extrabold text-primary">{stat.value}</div>
                </div>
                <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                  <Icon className="w-8 h-8" />
                </div>
              </div>
            )
          })}
        </div>

        {/* Continue Learning */}
        <h2 className="text-2xl font-headline font-bold text-primary mb-6">Active Operations</h2>
        
        {isHydrated && encodedIds.length === 0 ? (
          <div className="bg-surface-container-lowest border border-surface-dim rounded-[2rem] p-12 text-center shadow-lg mb-12 border-dashed">
            <h3 className="text-xl font-bold font-headline text-primary mb-2">Initialize Your Journey</h3>
            <p className="text-secondary mb-8 max-w-sm mx-auto font-medium">You have no active training protocols. Access the catalog to begin.</p>
            <Link to="/catalog" className="inline-flex items-center justify-center signature-gradient text-white font-bold py-4 px-10 rounded-2xl transition-all shadow-xl hover:scale-105 active:scale-95 text-lg">
              Explore Catalog
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {courses.map((course) => (
              <Link to={`/course/${course.id}`} key={course.id} className="block">
                <div className="bg-surface-container-lowest border border-surface-dim rounded-[2rem] p-8 relative overflow-hidden group cursor-pointer h-full flex flex-col justify-between ambient-shadow">
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-surface-dim">
                    <div className="h-full bg-primary transition-all" style={{ width: `0%` }} />
                  </div>
                  <div>
                    <h3 className="font-headline font-extrabold text-2xl text-primary mb-2 leading-tight tracking-tight">{course.title}</h3>
                    <p className="text-sm text-secondary font-bold uppercase tracking-widest mb-8">Level: <span className="text-primary">{course.level}</span></p>
                  </div>
                  
                  <div className="flex justify-between items-end border-t border-surface-dim pt-6 mt-4">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em] mb-1">Current Progress</span>
                      <div className="text-4xl font-headline font-extrabold text-primary">0%</div>
                    </div>
                    <button className="text-sm font-bold signature-gradient text-white px-8 py-3 rounded-xl hover:opacity-90 transition-all shadow-lg active:scale-95 uppercase tracking-widest">
                      Resume
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
