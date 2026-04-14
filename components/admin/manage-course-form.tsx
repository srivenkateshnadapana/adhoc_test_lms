"use client"

import * as React from "react"
import { StorageHub } from "@/lib/storage-hub"
import { Save, X, Plus, Trash2, ArrowLeft, Layers, BookOpen, AlertCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"
import Link from "next/link"

interface ManageCourseFormProps {
  initialData?: any
  isEditing?: boolean
}

export function ManageCourseForm({ initialData, isEditing = false }: ManageCourseFormProps) {
  const [loading, setLoading] = React.useState(false)
  const [course, setCourse] = React.useState(initialData || {
    title: "",
    description: "",
    instructor: "",
    category: "development",
    level: "Beginner",
    price_1month: 499,
    price_3months: 1299,
    price_6months: 2499,
    modules: []
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Validate
    if (!course.title || !course.description) {
      toast.error("Title and Description are required protocols.")
      setLoading(false)
      return
    }

    const res = isEditing 
      ? await StorageHub.updateCourse(course.id, course)
      : await StorageHub.createCourse(course)

    if (res.success) {
      toast.success(isEditing ? "Legacy asset updated successfully" : "New platform asset deployed")
      // Redirect handled by caller or router
    } else {
      toast.error(res.message || "Protocol execution failed")
    }
    setLoading(false)
  }

  const addModule = () => {
    const newModule = {
      title: "New Module Protocol",
      description: "Define the module learning objectives.",
      lessons: []
    }
    setCourse({ ...course, modules: [...course.modules, newModule] })
  }

  const removeModule = (mIndex: number) => {
    const updatedModules = [...course.modules]
    updatedModules.splice(mIndex, 1)
    setCourse({ ...course, modules: updatedModules })
  }

  const addLesson = (mIndex: number) => {
    const updatedModules = [...course.modules]
    const newLesson = {
      title: "Tactical Lesson Unit",
      content: "Initial lesson content payload.",
      duration: "15 mins",
      videoId: ""
    }
    updatedModules[mIndex].lessons.push(newLesson)
    setCourse({ ...course, modules: updatedModules })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="bg-white border border-surface-dim rounded-[2.5rem] p-10 ambient-shadow">
        <h3 className="text-xl font-headline font-extrabold text-primary mb-8 flex items-center gap-2">
          <Layers className="w-5 h-5 text-blue-600" />
          Primary Specifications
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em] ml-2">Syllabus Title</label>
            <input 
              type="text" 
              className="w-full bg-surface-container border border-surface-dim rounded-2xl py-4 px-6 outline-none focus:border-primary/30 transition-all font-bold text-primary placeholder:text-secondary/30"
              placeholder="e.g. Quantum Architecture Mastering"
              value={course.title}
              onChange={e => setCourse({...course, title: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em] ml-2">Lead Instructor</label>
            <input 
              type="text" 
              className="w-full bg-surface-container border border-surface-dim rounded-2xl py-4 px-6 outline-none focus:border-primary/30 transition-all font-bold text-primary placeholder:text-secondary/30"
              placeholder="e.g. Dr. Sarah Chen"
              value={course.instructor}
              onChange={e => setCourse({...course, instructor: e.target.value})}
            />
          </div>
          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em] ml-2">Curriculum Description</label>
            <textarea 
              rows={4}
              className="w-full bg-surface-container border border-surface-dim rounded-2xl py-4 px-6 outline-none focus:border-primary/30 transition-all font-medium text-primary placeholder:text-secondary/30"
              placeholder="Structure the learning path objectives..."
              value={course.description}
              onChange={e => setCourse({...course, description: e.target.value})}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:col-span-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em] ml-2">Sector Category</label>
              <select 
                 className="w-full bg-surface-container border border-surface-dim rounded-2xl py-4 px-6 outline-none focus:border-primary/30 transition-all font-bold text-primary appearance-none cursor-pointer"
                 value={course.category}
                 onChange={e => setCourse({...course, category: e.target.value})}
              >
                <option value="development">Development</option>
                <option value="design">Design</option>
                <option value="marketing">Marketing</option>
                <option value="business">Business</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em] ml-2">Complexity Level</label>
              <select 
                 className="w-full bg-surface-container border border-surface-dim rounded-2xl py-4 px-6 outline-none focus:border-primary/30 transition-all font-bold text-primary appearance-none cursor-pointer"
                 value={course.level}
                 onChange={e => setCourse({...course, level: e.target.value})}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced / Specialist</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em] ml-2">1 Month Price (INR)</label>
              <input 
                type="number" 
                className="w-full bg-surface-container border border-surface-dim rounded-2xl py-4 px-6 outline-none focus:border-primary/30 transition-all font-black text-primary"
                value={course.price_1month}
                onChange={e => setCourse({...course, price_1month: parseInt(e.target.value)})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em] ml-2">3 Months Price (INR)</label>
              <input 
                type="number" 
                className="w-full bg-surface-container border border-surface-dim rounded-2xl py-4 px-6 outline-none focus:border-primary/30 transition-all font-black text-primary"
                value={course.price_3months}
                onChange={e => setCourse({...course, price_3months: parseInt(e.target.value)})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em] ml-2">6 Months Price (INR)</label>
              <input 
                type="number" 
                className="w-full bg-surface-container border border-surface-dim rounded-2xl py-4 px-6 outline-none focus:border-primary/30 transition-all font-black text-primary"
                value={course.price_6months}
                onChange={e => setCourse({...course, price_6months: parseInt(e.target.value)})}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modules Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-xl font-headline font-extrabold text-primary flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-purple-600" />
            Curriculum Architecture
            <span className="text-xs font-bold text-secondary bg-surface-container px-3 py-1 rounded-full uppercase tracking-widest">{course.modules.length} Modules</span>
          </h3>
          <button 
            type="button" 
            onClick={addModule}
            className="text-xs font-bold signature-gradient text-white px-6 py-2.5 rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all uppercase tracking-widest"
          >
            Add Module
          </button>
        </div>

        <div className="space-y-6">
          <AnimatePresence>
            {course.modules.map((module: any, mIndex: number) => (
              <motion.div 
                key={mIndex}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="bg-white border border-surface-dim rounded-[2rem] p-8 ambient-shadow relative overflow-hidden group"
              >
                <div className="absolute top-0 left-0 w-2 h-full bg-primary/20 group-hover:bg-primary transition-all" />
                
                <div className="flex items-start justify-between mb-8">
                  <div className="flex-grow space-y-4">
                    <input 
                      type="text"
                      className="text-lg font-headline font-bold text-primary bg-transparent border-b border-surface-dim pb-1 outline-none focus:border-primary/50 transition-all w-full md:w-1/2"
                      value={module.title}
                      onChange={e => {
                        const updated = [...course.modules]
                        updated[mIndex].title = e.target.value
                        setCourse({...course, modules: updated})
                      }}
                    />
                    <input 
                      type="text"
                      className="text-sm text-secondary bg-transparent outline-none w-full italic"
                      placeholder="Module focal point..."
                      value={module.description}
                      onChange={e => {
                        const updated = [...course.modules]
                        updated[mIndex].description = e.target.value
                        setCourse({...course, modules: updated})
                      }}
                    />
                  </div>
                  <button 
                    type="button" 
                    onClick={() => removeModule(mIndex)}
                    className="p-2 text-secondary hover:text-error transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Lessons within Module */}
                <div className="space-y-3 pl-4 border-l-2 border-surface-container">
                  {module.lessons.map((lesson: any, lIndex: number) => (
                    <div key={lIndex} className="bg-surface-container/50 rounded-2xl p-4 flex items-center justify-between group/lesson hover:bg-surface-container transition-all">
                      <div className="flex items-center gap-4 flex-grow">
                        <span className="text-[10px] font-black text-secondary-variant w-4 italic">{lIndex + 1}</span>
                        <input 
                          type="text"
                          className="text-sm font-bold text-primary bg-transparent outline-none flex-grow"
                          value={lesson.title}
                          onChange={e => {
                            const updated = [...course.modules]
                            updated[mIndex].lessons[lIndex].title = e.target.value
                            setCourse({...course, modules: updated})
                          }}
                        />
                      </div>
                      <div className="flex items-center gap-4">
                        <input 
                          type="text"
                          className="text-[10px] font-bold text-secondary bg-surface-container rounded-lg px-2 py-1 outline-none w-20 text-center uppercase tracking-widest"
                          value={lesson.duration}
                          onChange={e => {
                            const updated = [...course.modules]
                            updated[mIndex].lessons[lIndex].duration = e.target.value
                            setCourse({...course, modules: updated})
                          }}
                        />
                        <button 
                          type="button"
                          onClick={() => {
                            const updated = [...course.modules]
                            updated[mIndex].lessons.splice(lIndex, 1)
                            setCourse({...course, modules: updated})
                          }}
                          className="opacity-0 group-hover/lesson:opacity-100 p-1 text-secondary hover:text-error transition-all"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                  <button 
                    type="button"
                    onClick={() => addLesson(mIndex)}
                    className="w-full border-2 border-dashed border-surface-dim rounded-2xl py-3 text-[10px] font-bold text-secondary uppercase tracking-[0.2em] hover:bg-surface-container hover:text-primary transition-all flex items-center justify-center gap-2"
                  >
                    <Plus className="w-3 h-3" />
                    Insert Analytical Unit
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {course.modules.length === 0 && (
            <div className="bg-surface-container/30 border-2 border-dashed border-surface-dim rounded-[2rem] p-12 text-center">
              <p className="text-secondary italic font-medium">Curriculum framework is currently empty.</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer Actions */}
      <footer className="flex items-center justify-between border-t border-surface-dim pt-10 px-4 mt-12">
        <Link href="/admin/courses" className="flex items-center gap-2 text-primary font-bold hover:opacity-70 transition-all uppercase tracking-widest text-[10px]">
          <ArrowLeft className="w-4 h-4" />
          Abort Protocol
        </Link>
        <button 
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 px-10 py-4 bg-primary text-white rounded-[1.5rem] font-bold shadow-2xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 uppercase tracking-[0.2em] text-sm"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Save className="w-5 h-5" />
          )}
          {loading ? "PROCESSING..." : isEditing ? "Push Updates" : "Initialize Asset"}
        </button>
      </footer>
    </form>
  )
}
