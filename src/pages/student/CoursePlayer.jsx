import * as React from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { PlayCircle, CheckCircle, ChevronRight, ArrowLeft, Loader2, Video } from "lucide-react"
import { StorageService } from "../../services/storage"
import { ProtectedRoute } from "../../context/ProtectedRoute"

export default function CoursePlayer() {
  return (
    <ProtectedRoute>
      <PlayerContent />
    </ProtectedRoute>
  )
}

function PlayerContent() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [course, setCourse] = React.useState(null)
  const [activeLesson, setActiveLesson] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  const [progress, setProgress] = React.useState({})

  React.useEffect(() => {
    const data = StorageService.getCourseById(id)
    if (data) {
      setCourse(data)
      const prog = StorageService.getProgress()[id] || {}
      setProgress(prog)
      // Set first lesson as active by default if available
      if (data.modules?.[0]?.lessons?.[0]) {
        setActiveLesson(data.modules[0].lessons[0])
      }
    }
    setLoading(false)
  }, [id])

  const handleLessonComplete = (lessonId) => {
    StorageService.updateProgress(id, lessonId)
    setProgress(prev => ({ ...prev, [lessonId]: 'completed' }))
  }

  if (loading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-primary" /></div>

  if (!course) return <div className="p-20 text-center">Course archive not found.</div>

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#00020e] text-on-surface">
      {/* Sidebar: Curriculum */}
      <aside className="w-full lg:w-96 bg-surface-container-low border-r border-surface-dim flex flex-col h-screen overflow-hidden">
        <div className="p-6 border-b border-surface-dim flex items-center justify-between">
          <Link to="/dashboard" className="text-secondary hover:text-primary transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h2 className="font-headline font-bold text-lg text-primary truncate max-w-[200px]">{course.title}</h2>
        </div>
        
        <div className="flex-grow overflow-y-auto no-scrollbar p-2">
          {course.modules?.map((module, i) => (
            <div key={module.id || i} className="mb-4">
              <div className="px-4 py-3 bg-surface-container rounded-xl mb-1">
                <span className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em] block mb-1">Module {i+1}</span>
                <h3 className="text-sm font-bold text-primary">{module.title}</h3>
              </div>
              <div className="space-y-1">
                {module.lessons?.map((lesson) => (
                  <button
                    key={lesson.id}
                    onClick={() => setActiveLesson(lesson)}
                    className={`w-full text-left px-5 py-3 rounded-xl flex items-center gap-3 transition-all ${activeLesson?.id === lesson.id ? 'bg-primary/10 text-primary border border-primary/20' : 'hover:bg-surface-container-high'}`}
                  >
                    {progress[lesson.id] === 'completed' ? (
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <PlayCircle className="w-4 h-4 text-secondary opacity-50" />
                    )}
                    <div className="flex-1">
                      <p className="text-xs font-semibold">{lesson.title}</p>
                      <p className="text-[10px] text-secondary opacity-70">{lesson.duration || '12:00'}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
          {(!course.modules || course.modules.length === 0) && (
            <p className="text-center text-xs text-secondary mt-10 p-4">No tactical modules found for this asset.</p>
          )}
        </div>
      </aside>

      {/* Main Content: Player */}
      <main className="flex-grow flex flex-col items-center justify-center p-4 lg:p-12">
        {activeLesson ? (
          <div className="w-full max-w-5xl h-full flex flex-col">
            <div className="relative aspect-video bg-black rounded-[2rem] overflow-hidden shadow-2xl border border-white/5 flex items-center justify-center group">
              <Video className="w-24 h-24 text-primary opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="absolute inset-x-0 bottom-0 p-8 pt-20 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-2xl font-headline font-extrabold text-white mb-2">{activeLesson.title}</h3>
                <p className="text-white/60 text-sm font-medium">Tactical Module Lesson • Secure Stream Active</p>
              </div>
            </div>
            
            <div className="mt-12 flex items-center justify-between bg-surface-container-lowest p-8 rounded-[2rem] ambient-shadow border border-surface-dim">
              <div>
                <h4 className="text-xl font-headline font-bold text-primary mb-1">{activeLesson.title}</h4>
                <p className="text-secondary text-sm">Protocol ID: LESSON-{activeLesson.id || 'INF-01'}</p>
              </div>
              <button
                onClick={() => handleLessonComplete(activeLesson.id)}
                className={`flex items-center gap-2 px-10 py-4 rounded-2xl font-bold transition-all ${progress[activeLesson.id] === 'completed' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'signature-gradient text-white shadow-xl hover:scale-105 active:scale-95'}`}
              >
                {progress[activeLesson.id] === 'completed' ? 'PROTOCOL COMPLETED' : 'COMPLETE LESSON'}
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <PlayCircle className="w-20 h-20 text-primary/20 mx-auto mb-6" />
            <h3 className="text-2xl font-headline font-bold text-primary">Select a protocol to begin.</h3>
          </div>
        )}
      </main>
    </div>
  )
}
