import React, { useState } from 'react'
import { X, Send, MessageCircle, Loader2, CheckCircle2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { StorageService } from '../../services/storage'
import { api } from '../../services/api'
import { toast } from 'sonner'

export default function RaiseDoubtModal({ isOpen, onClose, courseId, lessonId, onPostSuccess }) {
  const [form, setForm] = useState({ subject: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.subject.trim() || !form.message.trim()) return

    setSubmitting(true)
    try {
      const token = StorageService.getToken()
      const res = await api.tickets.create({
        subject: form.subject,
        message: form.message,
        courseId: courseId,
        lessonId: lessonId || null
      }, token)

      if (res.success) {
        setSuccess(true)
        if (onPostSuccess) onPostSuccess(res.data)
        setTimeout(() => {
          onClose()
          setSuccess(false)
          setForm({ subject: '', message: '' })
        }, 2000)
      } else {
        toast.error(res.message || "Failed to post doubt")
      }
    } catch (err) {
      toast.error("Network error. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-primary/20 backdrop-blur-md"
      />
      
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-lg bg-surface rounded-[2.5rem] shadow-2xl border border-surface-dim/20 overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 border-b border-surface-dim/10 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 signature-gradient rounded-xl flex items-center justify-center text-white">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-headline font-bold text-primary">Ask a Question</h3>
              <p className="text-[10px] font-bold text-secondary uppercase tracking-widest">Student Inquiries</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-surface-dim rounded-full transition-colors">
            <X className="w-5 h-5 text-secondary" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          <AnimatePresence mode="wait">
            {success ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <div className="w-20 h-20 bg-emerald-500 rounded-3xl flex items-center justify-center text-white shadow-xl shadow-emerald-500/20 mb-6">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-2xl font-headline font-bold text-primary mb-2 italic">Question Dispatched</h4>
                <p className="text-on-surface-variant max-w-xs">
                  Your inquiry has been logged. Our curriculum specialists will review and respond shortly.
                </p>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handleSubmit} 
                className="space-y-6"
              >
                <div>
                  <label className="block text-xs font-bold text-secondary uppercase tracking-[0.2em] mb-2">Subject</label>
                  <input
                    type="text"
                    required
                    value={form.subject}
                    onChange={e => setForm(p => ({ ...p, subject: e.target.value }))}
                    placeholder="Briefly describe your doubt..."
                    className="w-full px-5 py-4 bg-surface-container rounded-2xl border border-surface-dim/20 text-primary text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-outline/40"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-secondary uppercase tracking-[0.2em] mb-2">Detailed Message</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    placeholder="Provide more context or specific questions..."
                    className="w-full px-5 py-4 bg-surface-container rounded-2xl border border-surface-dim/20 text-primary text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-outline/40 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 signature-gradient text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50"
                >
                  {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                  Submit Inquiry
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}
