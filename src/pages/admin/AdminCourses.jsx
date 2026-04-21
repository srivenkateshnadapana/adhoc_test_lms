import React, { useState, useEffect } from 'react'
import { AdminProtectedRoute } from "../../context/AdminProtectedRoute"
import { api } from "../../services/api"
import { StorageService } from "../../services/storage"
import { BookOpen, Plus, Search, Filter, Edit, Trash2, Settings, Loader2, X } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"

export default function AdminCourses() {
  return (
    <AdminProtectedRoute>
      <AdminCoursesContent />
    </AdminProtectedRoute>
  )
}

function AdminCoursesContent() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCourse, setEditingCourse] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: 'cybersecurity',
    level: 'beginner',
    imageUrl: '',
    course_type: 'mega',
    allowed_plan: '1month'
  })

  useEffect(() => {
    loadCourses()
  }, [])

  const loadCourses = async () => {
    try {
      setLoading(true)
      const data = await api.courses.getAll()
      // API returns { success, count, data: [...] } usually, or just an array
      setCourses(data.data || data || [])
    } catch (error) {
      toast.error('Failed to load courses')
    } finally {
      setLoading(false)
    }
  }

  const handleOpenModal = (course = null) => {
    if (course) {
      setEditingCourse(course)
      setFormData({
        title: course.title,
        description: course.description || '',
        price: course.allowed_plan === '1month' ? course.prices['1month'] :
               course.allowed_plan === '3months' ? course.prices['3months'] : course.prices['6months'] || '',
        category: course.category || 'cybersecurity',
        level: course.level || 'beginner',
        imageUrl: course.thumbnail || '',
        course_type: course.course_type || 'mega',
        allowed_plan: course.allowed_plan || '1month'
      })
    } else {
      setEditingCourse(null)
      setFormData({ title: '', description: '', price: '', category: 'cybersecurity', level: 'beginner', imageUrl: '', course_type: 'mega', allowed_plan: '1month' })
    }
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingCourse(null)
  }

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const token = StorageService.getToken()
      const payload = {
        title: formData.title,
        description: formData.description,
        thumbnail: formData.imageUrl,
        course_type: formData.course_type,
        allowed_plan: formData.allowed_plan
      }
      
      if (formData.allowed_plan === '1month') payload.price_1month = Number(formData.price)
      if (formData.allowed_plan === '3months') payload.price_3months = Number(formData.price)
      if (formData.allowed_plan === '6months') payload.price_6months = Number(formData.price)
      
      if (editingCourse) {
        await api.admin.updateCourse(editingCourse.id, payload, token)
        toast.success('Course updated successfully')
      } else {
        await api.admin.createCourse(payload, token)
        toast.success('Course created successfully')
      }
      handleCloseModal()
      loadCourses()
    } catch (error) {
      toast.error('Operation failed')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
      try {
        const token = StorageService.getToken()
        await api.admin.deleteCourse(id, token)
        toast.success('Course deleted successfully')
        loadCourses()
      } catch (error) {
        toast.error('Failed to delete course')
      }
    }
  }

  return (
    <div className="min-h-screen bg-surface pt-24 pb-20 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-12 signature-gradient rounded-2xl flex items-center justify-center text-white shadow-lg">
                <BookOpen className="w-6 h-6" />
              </div>
              <h1 className="text-4xl font-headline font-bold text-primary">Asset Management</h1>
            </div>
            <p className="text-on-surface-variant">Create, update, and deploy curriculum assets to the tactical network.</p>
          </div>
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-surface-container-low text-secondary border border-surface-dim/20 rounded-xl font-bold hover:bg-surface-container transition-all flex items-center gap-2">
              <Filter className="w-5 h-5" /> Filter
            </button>
            <button onClick={() => handleOpenModal()} className="px-6 py-3 signature-gradient text-white rounded-xl font-bold shadow-lg hover:scale-105 active:scale-[0.98] transition-all flex items-center gap-2">
              <Plus className="w-5 h-5" /> Deploy New Asset
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
          </div>
        ) : courses.length === 0 ? (
          <div className="bg-surface-container-lowest rounded-[3rem] p-16 text-center border-2 border-dashed border-surface-dim shadow-inner">
            <BookOpen className="w-16 h-16 text-surface-dim mx-auto mb-6" />
            <h3 className="text-2xl font-headline font-bold text-primary mb-4">No Assets Found</h3>
            <p className="text-on-surface-variant max-w-sm mx-auto mb-8">
              There are currently no assets managed in this workspace. Click the button below to initiate asset creation.
            </p>
            <button onClick={() => handleOpenModal()} className="px-8 py-4 signature-gradient text-white rounded-xl font-bold shadow-lg hover:scale-105 active:scale-[0.98] transition-all inline-flex items-center gap-2">
              <Plus className="w-5 h-5" /> Initiate Asset Setup
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {courses.map(course => (
              <div key={course.id} className="bg-surface-container-lowest p-6 rounded-3xl border border-surface-dim/20 shadow-xl flex flex-col md:flex-row gap-6 items-center">
                <div className="w-full md:w-48 h-32 bg-surface-container rounded-2xl overflow-hidden shrink-0">
                  <img src={course.imageUrl || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800'} alt={course.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold text-secondary uppercase tracking-widest bg-surface-container-high px-2 py-1 rounded-md">{course.category || 'Category'}</span>
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/10 px-2 py-1 rounded-md">{course.level || 'Level'}</span>
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md ${course.course_type === 'mini' ? 'bg-amber-500/10 text-amber-500' : 'bg-blue-500/10 text-blue-500'}`}>
                      {course.course_type === 'mini' ? 'Mini Course' : 'Mega Course'}
                    </span>
                  </div>
                  <h3 className="text-2xl font-headline font-bold text-primary mb-2">{course.title}</h3>
                  <p className="text-sm text-on-surface-variant line-clamp-2">{course.description}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
                  <button onClick={() => navigate(`/admin/courses/${course.id}`)} className="px-6 py-3 bg-surface-container-high text-primary rounded-xl font-bold hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-2">
                    <Settings className="w-4 h-4" /> Content
                  </button>
                  <button onClick={() => handleOpenModal(course)} className="px-6 py-3 bg-surface-container-high text-secondary rounded-xl font-bold hover:text-primary transition-colors flex items-center justify-center gap-2">
                    <Edit className="w-4 h-4" /> Edit
                  </button>
                  <button onClick={() => handleDelete(course.id)} className="px-6 py-3 bg-red-500/10 text-red-500 rounded-xl font-bold hover:bg-red-500 hover:text-white transition-colors flex items-center justify-center gap-2">
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-surface-container-lowest rounded-[3rem] w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
              <div className="flex justify-between items-center p-8 border-b border-surface-dim/20">
                <h2 className="text-2xl font-headline font-bold text-primary">{editingCourse ? 'Update Asset' : 'Deploy New Asset'}</h2>
                <button onClick={handleCloseModal} className="p-2 bg-surface-container rounded-full text-secondary hover:text-primary transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Title</label>
                    <input type="text" name="title" value={formData.title} onChange={handleFormChange} required className="w-full px-4 py-3 bg-surface-container rounded-xl border border-surface-dim/20 focus:ring-2 focus:ring-primary focus:outline-none" />
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Description</label>
                    <textarea name="description" value={formData.description} onChange={handleFormChange} required rows="3" className="w-full px-4 py-3 bg-surface-container rounded-xl border border-surface-dim/20 focus:ring-2 focus:ring-primary focus:outline-none"></textarea>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Category</label>
                    <select name="category" value={formData.category} onChange={handleFormChange} className="w-full px-4 py-3 bg-surface-container rounded-xl border border-surface-dim/20 focus:ring-2 focus:ring-primary focus:outline-none text-primary font-medium">
                      <option value="cybersecurity">Cybersecurity</option>
                      <option value="cloud">Cloud Computing</option>
                      <option value="devops">DevOps</option>
                      <option value="aiml">AI / ML</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Level</label>
                    <select name="level" value={formData.level} onChange={handleFormChange} className="w-full px-4 py-3 bg-surface-container rounded-xl border border-surface-dim/20 focus:ring-2 focus:ring-primary focus:outline-none text-primary font-medium">
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Course Type</label>
                    <select name="course_type" value={formData.course_type} onChange={handleFormChange} className="w-full px-4 py-3 bg-surface-container rounded-xl border border-surface-dim/20 focus:ring-2 focus:ring-primary focus:outline-none text-primary font-medium">
                      <option value="mini">Mini Course</option>
                      <option value="mega">Mega Course</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Subscription Duration</label>
                    <select name="allowed_plan" value={formData.allowed_plan} onChange={handleFormChange} className="w-full px-4 py-3 bg-surface-container rounded-xl border border-surface-dim/20 focus:ring-2 focus:ring-primary focus:outline-none text-primary font-medium">
                      <option value="1month">1 Month</option>
                      <option value="3months">3 Months</option>
                      <option value="6months">6 Months</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Price (₹)</label>
                    <input type="number" name="price" value={formData.price} onChange={handleFormChange} required min="0" className="w-full px-4 py-3 bg-surface-container rounded-xl border border-surface-dim/20 focus:ring-2 focus:ring-primary focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Cover Image URL</label>
                    <input type="url" name="imageUrl" value={formData.imageUrl} onChange={handleFormChange} className="w-full px-4 py-3 bg-surface-container rounded-xl border border-surface-dim/20 focus:ring-2 focus:ring-primary focus:outline-none" placeholder="https://..." />
                  </div>
                </div>
                <div className="pt-6 border-t border-surface-dim/20 flex justify-end gap-4">
                  <button type="button" onClick={handleCloseModal} className="px-8 py-3 rounded-xl font-bold text-secondary hover:bg-surface-container transition-colors">Cancel</button>
                  <button type="submit" disabled={submitting} className="px-8 py-3 signature-gradient rounded-xl font-bold text-white flex items-center gap-2 hover:opacity-90 disabled:opacity-50">
                    {submitting && <Loader2 className="w-5 h-5 animate-spin" />}
                    {editingCourse ? 'Save Changes' : 'Deploy Asset'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
