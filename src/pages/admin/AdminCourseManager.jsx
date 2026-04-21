import React, { useState, useEffect } from 'react'
import { useParams, Link } from "react-router-dom"
import { AdminProtectedRoute } from "../../context/AdminProtectedRoute"
import { api } from "../../services/api"
import { StorageService } from "../../services/storage"
import { Layers, PlayCircle, Plus, Edit, Trash2, ArrowLeft, HelpCircle, Loader2, X, GripVertical } from "lucide-react"
import { toast } from "sonner"

// DnD Kit imports
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export default function AdminCourseManager() {
  return (
    <AdminProtectedRoute>
      <AdminCourseManagerContent />
    </AdminProtectedRoute>
  )
}

function AdminCourseManagerContent() {
  const { id } = useParams()
  const [course, setCourse] = useState(null)
  const [moduleQuizzes, setModuleQuizzes] = useState([])
  const [finalQuiz, setFinalQuiz] = useState(null)
  const [loading, setLoading] = useState(true)

  // DnD state
  const [activeId, setActiveId] = useState(null);

  // Modals state
  const [activeModal, setActiveModal] = useState(null) // 'module', 'lesson', 'quiz'
  const [editingItem, setEditingItem] = useState(null)
  const [parentId, setParentId] = useState(null) // For module ID when adding lesson
  const [submitting, setSubmitting] = useState(false)

  // Form states
  const [moduleForm, setModuleForm] = useState({ title: '', order: 1 })
  const [lessonForm, setLessonForm] = useState({ title: '', videoUrl: '', duration: 10, order: 1 })
  const [quizForm, setQuizForm] = useState({ title: '', passingScore: 80 })

  useEffect(() => {
    loadCourseData()
  }, [id])

  const loadCourseData = async () => {
    try {
      setLoading(true)
      const token = StorageService.getToken()
      
      // Fetch course & modules
      const data = await api.courses.getById(id, token)
      setCourse(data.data)

      // Fetch quizzes (to fix missing quiz bug)
      const quizData = await api.quizzes.getCourseQuizzes(id, token)
      if (quizData.success) {
        setModuleQuizzes(quizData.data.moduleQuizzes || [])
        setFinalQuiz(quizData.data.finalQuiz || null)
      }
    } catch (error) {
      toast.error('Failed to load course details')
    } finally {
      setLoading(false)
    }
  }

  // Sensors for Drag and Drop
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  // DnD Handlers
  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = async (event) => {
    setActiveId(null);
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      const activeType = active.data.current?.type;
      const overType = over.data.current?.type;

      if (activeType === 'module' && overType === 'module') {
        const oldIndex = course.modules.findIndex((m) => m.id === active.id);
        const newIndex = course.modules.findIndex((m) => m.id === over.id);

        const newModules = arrayMove(course.modules, oldIndex, newIndex);
        
        // Optimistic UI update
        setCourse(prev => ({ ...prev, modules: newModules }));

        // Prepare payload (update orders based on new index)
        const payload = newModules.map((m, index) => ({ id: m.id, order: index + 1 }));
        
        try {
          const token = StorageService.getToken()
          await api.admin.reorderModules(payload, token);
          toast.success('Modules reordered');
        } catch (error) {
          toast.error('Failed to save module order');
          loadCourseData(); // Revert on failure
        }
      }

      if (activeType === 'lesson' && overType === 'lesson') {
        const moduleId = active.data.current.moduleId;
        const moduleIndex = course.modules.findIndex(m => m.id === moduleId);
        const moduleToUpdate = course.modules[moduleIndex];

        const oldIndex = moduleToUpdate.lessons.findIndex(l => l.id === active.id);
        const newIndex = moduleToUpdate.lessons.findIndex(l => l.id === over.id);

        const newLessons = arrayMove(moduleToUpdate.lessons, oldIndex, newIndex);
        
        // Optimistic UI update
        const updatedModules = [...course.modules];
        updatedModules[moduleIndex] = { ...moduleToUpdate, lessons: newLessons };
        setCourse(prev => ({ ...prev, modules: updatedModules }));

        // Prepare payload
        const payload = newLessons.map((l, index) => ({ id: l.id, order: index + 1 }));

        try {
          const token = StorageService.getToken()
          await api.admin.reorderLessons(payload, token);
          toast.success('Lessons reordered');
        } catch (error) {
          toast.error('Failed to save lesson order');
          loadCourseData(); // Revert on failure
        }
      }
    }
  };

  // Modals Handlers
  const openModal = (type, item = null, parent = null, quizType = 'final') => {
    setActiveModal(type)
    setEditingItem(item)
    setParentId(parent)

    if (type === 'module') {
      setModuleForm(item ? { title: item.title, order: item.order } : { title: '', order: (course?.modules?.length || 0) + 1 })
    } else if (type === 'lesson') {
      // Find parent module to get next order
      const parentModule = course?.modules?.find(m => m.id === parent)
      const nextOrder = (parentModule?.lessons?.length || 0) + 1
      setLessonForm(item ? { title: item.title, videoUrl: item.videoUrl, duration: item.duration, order: item.order } : { title: '', videoUrl: '', duration: 10, order: nextOrder })
    } else if (type === 'quiz') {
      setQuizForm(item ? { title: item.title, passingScore: item.passingScore || 80, type: item.type || quizType, moduleId: item.moduleId || parent } : { title: '', passingScore: quizType === 'module' ? 0 : 80, type: quizType, moduleId: parent })
    }
  }

  const closeModal = () => {
    setActiveModal(null)
    setEditingItem(null)
    setParentId(null)
  }

  // Submit Handlers
  const handleModuleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const token = StorageService.getToken()
      if (editingItem) {
        await api.admin.updateModule(editingItem.id, moduleForm, token)
        toast.success('Module updated')
      } else {
        await api.admin.createModule(id, moduleForm, token)
        toast.success('Module created')
      }
      closeModal()
      loadCourseData()
    } catch (error) {
      toast.error('Operation failed')
    } finally {
      setSubmitting(false)
    }
  }

  const handleLessonSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const token = StorageService.getToken()
      if (editingItem) {
        await api.admin.updateLesson(editingItem.id, lessonForm, token)
        toast.success('Lesson updated')
      } else {
        await api.admin.createLesson(parentId, lessonForm, token)
        toast.success('Lesson created')
      }
      closeModal()
      loadCourseData()
    } catch (error) {
      toast.error('Operation failed')
    } finally {
      setSubmitting(false)
    }
  }

  const handleQuizSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const token = StorageService.getToken()
      if (editingItem) {
        await api.admin.updateQuiz(editingItem.id, { ...quizForm, passingScore: quizForm.type === 'module' ? 0 : quizForm.passingScore }, token)
        toast.success('Quiz updated')
      } else {
        await api.admin.createQuiz({ ...quizForm, courseId: id, passingScore: quizForm.type === 'module' ? 0 : quizForm.passingScore }, token)
        toast.success('Quiz created')
      }
      closeModal()
      loadCourseData()
    } catch (error) {
      toast.error('Operation failed')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (type, itemId) => {
    if (!window.confirm(`Are you sure you want to delete this ${type}?`)) return
    try {
      const token = StorageService.getToken()
      if (type === 'module') await api.admin.deleteModule(itemId, token)
      if (type === 'lesson') await api.admin.deleteLesson(itemId, token)
      if (type === 'quiz') await api.admin.deleteQuiz(itemId, token)
      toast.success(`${type} deleted`)
      loadCourseData()
    } catch (error) {
      toast.error(`Failed to delete ${type}`)
    }
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-surface"><Loader2 className="w-12 h-12 text-primary animate-spin" /></div>
  if (!course) return <div className="min-h-screen bg-surface pt-24 px-8 text-center text-primary">Course not found</div>

  return (
    <main className="min-h-screen bg-surface pt-24 pb-20 px-8">
      <div className="max-w-5xl mx-auto">
        <Link to="/admin/courses" className="inline-flex items-center gap-2 text-outline hover:text-primary transition-all font-bold text-xs uppercase tracking-widest mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Assets
        </Link>
        
        <div className="mb-12">
          <h1 className="text-4xl font-headline font-bold text-primary mb-2">{course.title}</h1>
          <p className="text-on-surface-variant">Manage curriculum hierarchy, tactical nodes, and knowledge assessments using Drag & Drop.</p>
        </div>

        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          {/* Modules Section */}
          <section className="mb-16">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-headline font-bold text-primary flex items-center gap-3">
                <Layers className="w-6 h-6" /> Modules & Lessons
              </h2>
              <button onClick={() => openModal('module')} className="px-6 py-3 signature-gradient text-white rounded-xl font-bold hover:opacity-90 flex items-center gap-2">
                <Plus className="w-5 h-5" /> Add Module
              </button>
            </div>

            <div className="space-y-6">
              <SortableContext items={course.modules?.map(m => m.id) || []} strategy={verticalListSortingStrategy}>
                {course.modules?.map((module, mIdx) => {
                  const modQuiz = moduleQuizzes.find(q => q.moduleId === module.id)
                  return (
                    <SortableModule 
                      key={module.id} 
                      module={module} 
                      modQuiz={modQuiz}
                      mIdx={mIdx} 
                      openModal={openModal} 
                      handleDelete={handleDelete} 
                    />
                  )
                })}
              </SortableContext>
              
              {(!course.modules || course.modules.length === 0) && (
                <div className="p-12 text-center border-2 border-dashed border-surface-dim/30 rounded-3xl text-secondary">
                  No modules found. Create one to get started.
                </div>
              )}
            </div>
          </section>
        </DndContext>

        {/* Quizzes Section */}
        <section>
          <div className="flex justify-between items-center mb-6 mt-12">
            <h2 className="text-2xl font-headline font-bold text-primary flex items-center gap-3">
              <HelpCircle className="w-6 h-6" /> Course Quizzes
            </h2>
            <button onClick={() => openModal('quiz', null, null, 'final')} className="px-6 py-3 bg-surface-container-low text-primary border border-primary/20 rounded-xl font-bold hover:bg-primary/10 flex items-center gap-2">
              <Plus className="w-5 h-5" /> Add Final Quiz
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {!finalQuiz && (
                <div className="col-span-full p-12 text-center border-2 border-dashed border-surface-dim/30 rounded-3xl text-secondary">
                  No final quiz configured.
                </div>
             )}
             {finalQuiz && (
               <div className="bg-surface-container-lowest p-6 border border-surface-dim/20 rounded-3xl shadow-lg flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-headline font-bold text-primary mb-2">{finalQuiz.title}</h3>
                    <p className="text-xs font-bold text-emerald-500 uppercase tracking-widest bg-emerald-500/10 px-2 py-1 rounded-md inline-block">Final Quiz • Pass: {finalQuiz.passingScore}%</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => openModal('quiz', finalQuiz, null, 'final')} className="p-2 text-secondary hover:text-primary"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete('quiz', finalQuiz.id)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                  </div>
               </div>
             )}
          </div>
        </section>

        {/* Modals */}
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-surface-container-lowest rounded-[3rem] w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
              <div className="flex justify-between items-center p-6 border-b border-surface-dim/20">
                <h2 className="text-xl font-headline font-bold text-primary capitalize">{editingItem ? 'Edit' : 'Add'} {activeModal}</h2>
                <button onClick={closeModal} className="p-2 bg-surface-container rounded-full text-secondary hover:text-primary"><X className="w-5 h-5" /></button>
              </div>
              
              <form onSubmit={
                activeModal === 'module' ? handleModuleSubmit : 
                activeModal === 'lesson' ? handleLessonSubmit : handleQuizSubmit
              } className="p-6 space-y-4">
                
                {/* Module Form */}
                {activeModal === 'module' && (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Module Title</label>
                      <input type="text" value={moduleForm.title} onChange={e => setModuleForm({...moduleForm, title: e.target.value})} required className="w-full px-4 py-3 bg-surface-container rounded-xl border border-surface-dim/20 focus:ring-2 focus:ring-primary focus:outline-none" />
                    </div>
                  </>
                )}

                {/* Lesson Form */}
                {activeModal === 'lesson' && (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Lesson Title</label>
                      <input type="text" value={lessonForm.title} onChange={e => setLessonForm({...lessonForm, title: e.target.value})} required className="w-full px-4 py-3 bg-surface-container rounded-xl border border-surface-dim/20 focus:ring-2 focus:ring-primary focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Video URL (Vimeo/MP4)</label>
                      <input type="url" value={lessonForm.videoUrl} onChange={e => setLessonForm({...lessonForm, videoUrl: e.target.value})} className="w-full px-4 py-3 bg-surface-container rounded-xl border border-surface-dim/20 focus:ring-2 focus:ring-primary focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Duration (mins)</label>
                      <input type="number" value={lessonForm.duration} onChange={e => setLessonForm({...lessonForm, duration: Number(e.target.value)})} required min="1" className="w-full px-4 py-3 bg-surface-container rounded-xl border border-surface-dim/20 focus:ring-2 focus:ring-primary focus:outline-none" />
                    </div>
                  </>
                )}

                {/* Quiz Form */}
                {activeModal === 'quiz' && (
                  <>
                    <div className="mb-4">
                      <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-md ${quizForm.type === 'final' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-blue-500/10 text-blue-600'}`}>
                        {quizForm.type} Quiz
                      </span>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Quiz Title</label>
                      <input type="text" value={quizForm.title} onChange={e => setQuizForm({...quizForm, title: e.target.value})} required className="w-full px-4 py-3 bg-surface-container rounded-xl border border-surface-dim/20 focus:ring-2 focus:ring-primary focus:outline-none" />
                    </div>
                    {quizForm.type === 'final' && (
                      <div>
                        <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Passing Score (%)</label>
                        <input type="number" value={quizForm.passingScore} onChange={e => setQuizForm({...quizForm, passingScore: Number(e.target.value)})} required min="1" max="100" className="w-full px-4 py-3 bg-surface-container rounded-xl border border-surface-dim/20 focus:ring-2 focus:ring-primary focus:outline-none" />
                      </div>
                    )}
                    {quizForm.type === 'module' && (
                      <p className="text-xs text-secondary italic">Module quizzes act as knowledge checks and have no minimum passing criteria.</p>
                    )}
                  </>
                )}

                <div className="pt-6 flex justify-end gap-3">
                  <button type="button" onClick={closeModal} className="px-6 py-3 rounded-xl font-bold text-secondary hover:bg-surface-container">Cancel</button>
                  <button type="submit" disabled={submitting} className="px-6 py-3 signature-gradient rounded-xl font-bold text-white flex items-center gap-2">
                    {submitting && <Loader2 className="w-4 h-4 animate-spin" />} Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

// Subcomponent for Sortable Module
function SortableModule({ module, modQuiz, mIdx, openModal, handleDelete }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ 
    id: module.id,
    data: { type: 'module' }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="bg-surface-container-lowest border border-surface-dim/20 rounded-3xl overflow-hidden shadow-lg mb-6">
      <div className="bg-surface-container-low p-6 flex justify-between items-center border-b border-surface-dim/20 group">
        <div className="flex items-center gap-4">
          <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing p-2 text-surface-dim hover:text-secondary transition-colors">
            <GripVertical className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Module {mIdx + 1}</p>
            <h3 className="text-xl font-headline font-bold text-primary">{module.title}</h3>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => openModal('lesson', null, module.id)} className="p-2 text-primary bg-primary/10 rounded-lg hover:bg-primary/20" title="Add Lesson"><Plus className="w-5 h-5" /></button>
          <button onClick={() => openModal('quiz', modQuiz, module.id, 'module')} className="p-2 text-emerald-600 bg-emerald-500/10 rounded-lg hover:bg-emerald-500/20" title={modQuiz ? "Edit Module Quiz" : "Add Module Quiz"}><HelpCircle className="w-5 h-5" /></button>
          <button onClick={() => openModal('module', module)} className="p-2 text-secondary hover:text-primary"><Edit className="w-5 h-5" /></button>
          <button onClick={() => handleDelete('module', module.id)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg"><Trash2 className="w-5 h-5" /></button>
        </div>
      </div>
      
      <div className="p-6 space-y-3">
        {module.lessons?.length === 0 && <p className="text-secondary text-sm italic pl-10">No lessons in this module.</p>}
        
        <SortableContext items={module.lessons?.map(l => l.id) || []} strategy={verticalListSortingStrategy}>
          {module.lessons?.map((lesson, lIdx) => (
            <SortableLesson 
              key={lesson.id} 
              lesson={lesson} 
              moduleId={module.id} 
              lIdx={lIdx} 
              openModal={openModal} 
              handleDelete={handleDelete} 
            />
          ))}
        </SortableContext>

        {/* Render Module Quiz at the bottom of the module (non-draggable to keep it fixed at the end) */}
        {modQuiz && (
          <div className="flex justify-between items-center p-4 bg-blue-500/5 rounded-2xl border border-blue-500/20">
             <div className="flex items-center gap-4 pl-10">
                <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-600 shrink-0">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-blue-800">{modQuiz.title}</p>
                  <p className="text-xs text-blue-600 mt-1">Knowledge Check</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => openModal('quiz', modQuiz, module.id, 'module')} className="text-secondary hover:text-primary"><Edit className="w-4 h-4" /></button>
                <button onClick={() => handleDelete('quiz', modQuiz.id)} className="text-red-500/60 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
              </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Subcomponent for Sortable Lesson
function SortableLesson({ lesson, moduleId, lIdx, openModal, handleDelete }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ 
    id: lesson.id,
    data: { type: 'lesson', moduleId }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="flex justify-between items-center p-4 bg-surface rounded-2xl border border-surface-dim/10 hover:border-primary/20 transition-all">
      <div className="flex items-center gap-4">
        <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing p-2 text-surface-dim hover:text-secondary transition-colors">
          <GripVertical className="w-4 h-4" />
        </div>
        <div className="w-10 h-10 bg-surface-container rounded-full flex items-center justify-center text-primary shrink-0">
          <PlayCircle className="w-5 h-5" />
        </div>
        <div>
          <p className="font-bold text-primary">{lesson.title}</p>
          <p className="text-xs text-secondary mt-1">{lesson.duration} mins • Part {lIdx + 1}</p>
        </div>
      </div>
      <div className="flex gap-3">
        <button onClick={() => openModal('lesson', lesson, moduleId)} className="text-secondary hover:text-primary"><Edit className="w-4 h-4" /></button>
        <button onClick={() => handleDelete('lesson', lesson.id)} className="text-red-500/60 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
      </div>
    </div>
  )
}
