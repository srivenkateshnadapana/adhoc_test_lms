"use client"

import * as React from "react"
import { AdminProtectedRoute } from "@/components/auth/admin-protected-route"
import { masterCourses as courses } from "@/lib/data/courses"
import { StorageHub } from "@/lib/storage-hub"
import { Plus, Edit2, Trash2, Search, Filter, MoreHorizontal } from "lucide-react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import Link from "next/link"

export default function AdminCoursesPage() {
  return (
    <AdminProtectedRoute>
      <AdminCoursesContent />
    </AdminProtectedRoute>
  )
}

function AdminCoursesContent() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [categoryFilter, setCategoryFilter] = React.useState("all")

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || course.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const handleDelete = async (courseId: string, title: string) => {
    if (confirm(`Are you sure you want to decommission "${title}"? This action is irreversible in the live database.`)) {
      const res = await StorageHub.deleteCourse(courseId)
      if (res.success) {
        toast.success("Course decommissioned successfully")
        // Note: In a real app, we would refresh the data from the backend here
      } else {
        toast.error(res.message || "Failed to delete course")
      }
    }
  }

  return (
    <main className="min-h-screen bg-surface pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-surface-dim pb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Link href="/admin" className="text-secondary hover:text-primary transition-colors text-sm font-bold uppercase tracking-widest">Dashboard</Link>
              <span className="text-surface-dim font-bold">/</span>
              <span className="text-primary text-sm font-bold uppercase tracking-widest">Proctoring Management</span>
            </div>
            <h1 className="text-4xl font-headline font-extrabold text-primary tracking-tight">System Content</h1>
            <p className="text-secondary mt-1 italic">Manage learning protocols and academic syllabus structures.</p>
          </div>
          <Link 
            href="/admin/courses/new" 
            className="inline-flex items-center gap-2 px-6 py-3 signature-gradient text-white rounded-2xl font-bold shadow-xl hover:scale-105 transition-all active:scale-95"
          >
            <Plus className="w-5 h-5" />
            Launch New Course
          </Link>
        </header>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary group-focus-within:text-primary transition-colors" />
            <input 
              type="text"
              placeholder="Search assets by title or instructor..."
              className="w-full bg-white border border-surface-dim rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:border-primary/30 focus:ring-4 focus:ring-primary/5 transition-all text-sm font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
              <select 
                className="bg-white border border-surface-dim rounded-2xl py-3.5 pl-10 pr-8 outline-none focus:border-primary/30 transition-all text-sm font-bold text-secondary appearance-none cursor-pointer"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="all">Every Category</option>
                <option value="design">Design Architecture</option>
                <option value="marketing">Market Strategy</option>
                <option value="development">Core Development</option>
                <option value="business">Business Intelligence</option>
              </select>
            </div>
          </div>
        </div>

        {/* Course Grid */}
        <div className="bg-white border border-surface-dim rounded-[2rem] overflow-hidden ambient-shadow">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-surface-container/50 border-b border-surface-dim">
                  <th className="px-8 py-5 text-[10px] font-bold text-secondary uppercase tracking-[0.2em]">Syllabus Title</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-secondary uppercase tracking-[0.2em]">Instructor</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-secondary uppercase tracking-[0.2em]">Enrolment Unit</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-secondary uppercase tracking-[0.2em]">Asset Status</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-secondary uppercase tracking-[0.2em]">Operations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-dim">
                {filteredCourses.map((course) => (
                  <motion.tr 
                    key={course.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-surface-container-lowest transition-colors group"
                  >
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="font-bold text-primary group-hover:text-blue-700 transition-colors uppercase tracking-tight">{course.title}</span>
                        <span className="text-[10px] text-secondary font-bold uppercase tracking-widest mt-1 opacity-60">ID: {course.id.substring(0, 8)}...</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-sm font-medium text-secondary">{course.instructor}</span>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-sm font-bold text-primary">₹{course.price}</span>
                    </td>
                    <td className="px-8 py-6">
                      <span className="inline-flex items-center px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-bold uppercase tracking-widest border border-emerald-100 italic">
                        Live Payload
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <Link 
                          href={`/admin/courses/edit/${course.id}`}
                          className="p-2.5 bg-surface-container text-secondary hover:text-primary hover:bg-primary/5 rounded-xl transition-all border border-transparent hover:border-primary/20 shadow-sm"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Link>
                        <button 
                          onClick={() => handleDelete(course.id, course.title)}
                          className="p-2.5 bg-surface-container text-secondary hover:text-error hover:bg-error/5 rounded-xl transition-all border border-transparent hover:border-error/20 shadow-sm"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredCourses.length === 0 && (
            <div className="p-20 text-center">
              <p className="text-secondary font-medium font-headline">Zero assets found matching the current search matrix.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
