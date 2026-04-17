import * as React from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { PlayCircle, CheckCircle, ChevronRight, ArrowLeft, Loader2, Video, List, Layers, ShieldCheck } from "lucide-react"
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

  if (loading) return <div className="h-screen bg-primary flex items-center justify-center"><Loader2 className="animate-spin text-white w-12 h-12" /></div>

  if (!course) return (
    <div className="h-screen flex flex-col items-center justify-center bg-surface p-8 text-center">
      <h1 className="text-4xl font-headline font-bold text-primary mb-4">Tactical Archive Offline</h1>
      <Link to="/dashboard" className="px-8 py-3 signature-gradient text-white rounded-xl font-bold">Return to Base</Link>
    </div>
  )

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-surface">
      {/* Sidebar: Premium Curriculum */}
      <aside className="w-full lg:w-[450px] bg-surface-container-low border-r border-surface-dim/20 flex flex-col h-screen relative z-30">
        <div className="p-8 border-b border-surface-dim/20 bg-white">
          <Link to="/dashboard" className="inline-flex items-center gap-2 text-outline hover:text-primary transition-all font-bold text-[10px] uppercase tracking-[0.3em] mb-6">
            <ArrowLeft className="w-4 h-4" /> Operations Room
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl signature-gradient flex items-center justify-center text-white shrink-0 shadow-lg">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em] leading-none mb-1">Active Curriculum</p>
              <h2 className="font-headline font-bold text-lg text-primary truncate max-w-[200px]">{course.title}</h2>
            </div>
          </div>
        </div>
        
        <div className="flex-grow overflow-y-auto no-scrollbar p-6 space-y-8 bg-surface-container-low/30 backdrop-blur-3xl">
          {course.modules?.map((module, i) => (
            <div key={module.id || i} className="space-y-3">
              <div className="flex items-center gap-2 px-2">
                <span className="text-[10px] font-bold text-primary/40 uppercase tracking-[0.4em]">Section {i+1} •</span>
                <span className="text-[10px] font-bold text-primary uppercase tracking-[0.1em]">{module.title}</span>
              </div>
              <div className="space-y-2">
                {module.lessons?.map((lesson) => (
                  <button
                    key={lesson.id}
                    onClick={() => setActiveLesson(lesson)}
                    className={`w-full text-left px-6 py-5 rounded-3xl flex items-center gap-4 transition-all group ${activeLesson?.id === lesson.id ? 'bg-primary text-white shadow-xl shadow-primary/20 translate-x-1' : 'bg-white hover:bg-surface-container-high'}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${activeLesson?.id === lesson.id ? 'bg-white/20' : 'bg-surface-container-high'}`}>
                      {progress[lesson.id] === 'completed' ? (
                        <CheckCircle className={`w-4 h-4 ${activeLesson?.id === lesson.id ? 'text-white' : 'text-emerald-500'}`} />
                      ) : (
                        <PlayCircle className={`w-4 h-4 ${activeLesson?.id === lesson.id ? 'text-white' : 'text-secondary opacity-60'}`} />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`text-xs font-bold leading-tight ${activeLesson?.id === lesson.id ? 'text-white' : 'text-primary'}`}>{lesson.title}</p>
                      <p className={`text-[10px] uppercase font-bold tracking-widest mt-1 opacity-60 ${activeLesson?.id === lesson.id ? 'text-white' : 'text-secondary'}`}>
                        {lesson.duration || '12:00'} • Tactical Node
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
          {(!course.modules || course.modules.length === 0) && (
            <div className="text-center py-12 px-6">
              <p className="text-xs font-bold text-secondary uppercase tracking-widest leading-relaxed">No tactical data modules mapped for this operation.</p>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content: Premium Cinematic Player */}
      <main className="flex-grow flex flex-col h-screen overflow-hidden bg-white">
        {activeLesson ? (
          <div className="flex-grow flex flex-col p-8 lg:p-12 overflow-y-auto no-scrollbar">
            <div className="w-full max-w-6xl mx-auto flex flex-col h-full">
              {/* Player Area */}
              <div className="relative aspect-video bg-primary rounded-[3rem] overflow-hidden shadow-2xl group flex items-center justify-center border-8 border-surface-container-low">
                <img 
                  src={course.imageUrl || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1600"} 
                  className="absolute inset-0 w-full h-full object-cover opacity-60 blur-[2px] scale-105" 
                  alt="Video Static"
                />
                <div className="relative z-10 w-24 h-24 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center text-white group-hover:scale-110 transition-transform cursor-pointer">
                  <PlayCircle className="w-10 h-10 fill-current" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-12 pt-24 bg-gradient-to-t from-primary via-primary/40 to-transparent">
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.4em] block mb-2">Live Stream Active</span>
                  <h3 className="text-4xl font-headline font-extrabold text-white tracking-tighter italic">{activeLesson.title}</h3>
                </div>
              </div>
              
              {/* Meta Info */}
              <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-8 bg-surface-container-lowest p-10 rounded-[3rem] border border-surface-dim/20 shadow-xl shadow-primary/5">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary-fixed flex items-center justify-center text-primary shadow-inner">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-headline font-bold text-primary leading-tight mb-1">{activeLesson.title}</h4>
                    <p className="text-[10px] font-bold text-outline uppercase tracking-widest">Protocol ID: OPER-NODE-{activeLesson.id || '01'}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleLessonComplete(activeLesson.id)}
                  className={`flex items-center gap-3 px-12 py-5 rounded-3xl font-headline font-bold text-lg transition-all active:scale-[0.98] ${progress[activeLesson.id] === 'completed' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'signature-gradient text-white shadow-xl hover:opacity-90 shadow-primary/20'}`}
                >
                  {progress[activeLesson.id] === 'completed' ? (
                    <>
                      <CheckCircle className="w-6 h-6" />
                      PROTOCOL COMPLETE
                    </>
                  ) : (
                    <>
                      FINALIZE NODE
                      <ChevronRight className="w-6 h-6" />
                    </>
                  )}
                </button>
              </div>

              {/* Lesson Notes / Extra */}
              <div className="mt-12 space-y-8 max-w-3xl">
                <h5 className="text-[10px] font-bold text-primary uppercase tracking-[0.5em] italic">Operation intel</h5>
                <p className="text-on-surface-variant text-lg leading-relaxed font-medium">
                  This tactical module addresses the fundamental principles of {course.category}. Learners should focus on the architectural hierarchy and the integration of decentralized protocols.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-grow flex flex-col items-center justify-center text-center p-12">
            <div className="w-24 h-24 rounded-full bg-surface-container flex items-center justify-center text-primary/20 mb-8 border border-surface-dim/20">
              <PlayCircle className="w-12 h-12" />
            </div>
            <h3 className="text-3xl font-headline font-bold text-primary italic">Initiate Curriculum Sequence</h3>
            <p className="text-outline text-lg font-medium mt-4 max-w-sm">Select a protocol from the mapping room to start the tactical stream.</p>
          </div>
        )}
      </main>
    </div>
  )
}
