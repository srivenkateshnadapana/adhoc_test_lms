"use client"

import * as React from "react"
import { AdminProtectedRoute } from "@/components/auth/admin-protected-route"
import { StorageHub } from "@/lib/storage-hub"
import { Users, BookOpen, IndianRupee, TrendingUp, BarChart3, Layout } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function AdminDashboardPage() {
  return (
    <AdminProtectedRoute>
      <AdminDashboardContent />
    </AdminProtectedRoute>
  )
}

function AdminDashboardContent() {
  const [stats, setStats] = React.useState<any>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchStats = async () => {
      const data = await StorageHub.getAdminStats()
      setStats(data)
      setLoading(false)
    }
    fetchStats()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-surface">
      <div className="animate-pulse text-primary font-headline font-bold">LOADING ANALYTICS...</div>
    </div>
  )

  const statCards = [
    { label: "Total Learners", value: stats?.users?.students || 0, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Active Revenue", value: `₹${stats?.revenue?.total || 0}`, icon: IndianRupee, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Live Courses", value: stats?.content?.courses || 0, icon: BookOpen, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Admin Staff", value: stats?.users?.admins || 0, icon: Layout, color: "text-amber-600", bg: "bg-amber-50" },
  ]

  return (
    <main className="min-h-screen bg-surface pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-headline font-extrabold text-primary tracking-tight">Admin Console</h1>
            <p className="text-secondary mt-2">Central command for platform operations and institutional growth.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/admin/courses" className="px-6 py-2.5 bg-primary text-white rounded-xl font-bold hover:opacity-90 transition-all shadow-lg active:scale-95 text-sm">
              Manage Courses
            </Link>
            <button className="px-6 py-2.5 bg-surface-container text-primary border border-surface-dim rounded-xl font-bold hover:bg-surface-container-high transition-all text-sm">
              Export Audit
            </button>
          </div>
        </header>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
        >
          {statCards.map((card) => (
            <motion.div 
              key={card.label}
              variants={cardVariants}
              whileHover={{ y: -5 }}
              className="bg-white border border-surface-dim rounded-[2rem] p-8 shadow-sm ambient-shadow flex items-start justify-between"
            >
              <div>
                <p className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em] mb-1">{card.label}</p>
                <h3 className="text-3xl font-headline font-extrabold text-primary">{card.value}</h3>
              </div>
              <div className={`p-4 rounded-2xl ${card.bg} ${card.color}`}>
                <card.icon className="w-6 h-6" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Charts Placeholder */}
          <div className="lg:col-span-2 bg-white border border-surface-dim rounded-[2rem] p-8 ambient-shadow min-h-[400px] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-headline font-bold text-xl text-primary flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Enrollment Trends
              </h3>
              <select className="bg-surface-container rounded-lg px-3 py-1.5 text-xs font-bold text-secondary border-none outline-none">
                <option>Last 30 Days</option>
                <option>Last 6 Months</option>
              </select>
            </div>
            <div className="flex-grow flex items-center justify-center border-2 border-dashed border-surface-dim rounded-3xl">
              <span className="text-secondary font-medium italic opacity-50">Trend Visualization Data Loading...</span>
            </div>
          </div>

          <div className="bg-white border border-surface-dim rounded-[2rem] p-8 ambient-shadow flex flex-col">
            <h3 className="font-headline font-bold text-xl text-primary mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Quick Actions
            </h3>
            <div className="space-y-4">
              <button className="w-full text-left p-4 rounded-2xl bg-surface-container hover:bg-primary/5 group transition-all border border-transparent hover:border-primary/20">
                <p className="font-bold text-sm text-primary">Announcement</p>
                <p className="text-xs text-secondary">Broadcast to all active learners.</p>
              </button>
              <button className="w-full text-left p-4 rounded-2xl bg-surface-container hover:bg-primary/5 group transition-all border border-transparent hover:border-primary/20">
                <p className="font-bold text-sm text-primary">Audit Users</p>
                <p className="text-xs text-secondary">Identify inactive subscription patterns.</p>
              </button>
              <button className="w-full text-left p-4 rounded-2xl bg-surface-container hover:bg-primary/5 group transition-all border border-transparent hover:border-primary/20">
                <p className="font-bold text-sm text-primary">System Config</p>
                <p className="text-xs text-secondary">Adjust platform-wide global variables.</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
