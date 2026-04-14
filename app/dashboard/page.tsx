"use client"

import * as React from "react"
import { ProtectedRoute } from "@/components/auth"
import { BookOpen, GraduationCap, LayoutDashboard, Clock } from "lucide-react"
import { masterCourses } from "@/lib/data/courses"
import { StorageHub, ENROLLMENTS_KEY } from "@/lib/storage-hub"
import Link from "next/link"
import { motion } from "framer-motion"

export default function DashboardPage() {
  return (
    <ProtectedRoute fallbackPath="/auth">
      <DashboardContent />
    </ProtectedRoute>
  )
}

function DashboardContent() {
  const [enrolledPrograms, setEnrolledPrograms] = React.useState<any[]>([])
  const [isHydrated, setIsHydrated] = React.useState(false)

  React.useEffect(() => {
    const handleUpdate = async () => {
      const data = await StorageHub.getEnrollments()
      setEnrolledPrograms(data)
    }

    handleUpdate()
    setIsHydrated(true)
    window.addEventListener(`storage-update-${ENROLLMENTS_KEY}`, handleUpdate)
    window.addEventListener('enrollment-update', handleUpdate)
    return () => {
      window.removeEventListener(`storage-update-${ENROLLMENTS_KEY}`, handleUpdate)
      window.removeEventListener('enrollment-update', handleUpdate)
    }
  }, [])

  const stats = [
    { label: "Active Courses", value: isHydrated ? enrolledPrograms.length.toString() : "-", icon: BookOpen, color: "text-primary", bg: "bg-surface-container-high" },
    { label: "Certificates", value: "0", icon: GraduationCap, color: "text-secondary", bg: "bg-surface-container-high" },
    { label: "Hours Learned", value: isHydrated ? (enrolledPrograms.length * 12).toString() : "-", icon: Clock, color: "text-primary", bg: "bg-surface-container-high" },
    { label: "Achievements", value: "0", icon: LayoutDashboard, color: "text-secondary", bg: "bg-surface-container-high" },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <main className="min-h-screen bg-surface text-on-surface relative overflow-hidden pt-24 pb-12">
      {/* Ambience */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
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
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <motion.div variants={itemVariants} whileHover={{ y: -5, boxShadow: "0px 10px 30px rgba(0,0,0,0.05)" }} key={stat.label} className="bg-surface-container-low border border-surface-dim rounded-3xl p-6 backdrop-blur-md flex items-center justify-between group transition-all">
                <div>
                  <div className="text-secondary text-[10px] font-bold uppercase tracking-widest mb-1">{stat.label}</div>
                  <div className="text-4xl font-headline font-extrabold text-primary">{stat.value}</div>
                </div>
                <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                  <Icon className="w-8 h-8" />
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Continue Learning */}
        <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-2xl font-headline font-bold text-primary mb-6">Active Operations</motion.h2>
        
        {isHydrated && enrolledPrograms.length === 0 ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-surface-container-lowest border border-surface-dim rounded-[2rem] p-12 text-center shadow-lg ambient-shadow mb-12 border-dashed">
            <h3 className="text-xl font-bold font-headline text-primary mb-2">Initialize Your Journey</h3>
            <p className="text-secondary mb-8 max-w-sm mx-auto font-medium">You have no active training protocols. Access the catalog to begin.</p>
            <Link href="/catalog" className="inline-flex items-center justify-center signature-gradient text-white font-bold py-4 px-10 rounded-2xl transition-all shadow-xl hover:scale-105 active:scale-95 text-lg">
              Explore Catalog
            </Link>
          </motion.div>
        ) : (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {enrolledPrograms.map((course, index) => {
              const displayProgress = 0; 
              
              return (
                <Link href={`/course/${course.id}`} key={course.id} className="block">
                  <motion.div variants={itemVariants} whileHover={{ y: -5, boxShadow: "0px 15px 40px rgba(0,2,14,0.08)" }} className="bg-surface-container-lowest border border-surface-dim rounded-[2rem] p-8 relative overflow-hidden group cursor-pointer h-full flex flex-col justify-between ambient-shadow">
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-surface-dim">
                      <div className="h-full bg-primary transition-all" style={{ width: `${displayProgress}%` }} />
                    </div>
                    <div>
                      <h3 className="font-headline font-extrabold text-2xl text-primary mb-2 leading-tight tracking-tight">{course.title}</h3>
                      <p className="text-sm text-secondary font-bold uppercase tracking-widest mb-8">Level: <span className="text-primary">{course.level}</span></p>
                    </div>
                    
                    <div className="flex justify-between items-end border-t border-surface-dim pt-6 mt-4">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em] mb-1">Current Progress</span>
                        <div className="text-4xl font-headline font-extrabold text-primary">{displayProgress}%</div>
                      </div>
                      <button className="text-sm font-bold signature-gradient text-white px-8 py-3 rounded-xl hover:opacity-90 transition-all shadow-lg active:scale-95 uppercase tracking-widest">
                        Resume
                      </button>
                    </div>
                  </motion.div>
                </Link>
              )
            })}
          </motion.div>
        )}
      </div>
    </main>
  )
}
