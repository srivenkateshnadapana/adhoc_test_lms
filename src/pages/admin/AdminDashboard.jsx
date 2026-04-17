import * as React from "react"
import { AdminProtectedRoute } from "../../context/AdminProtectedRoute"
import { StorageService } from "../../services/storage"
import { Users, BookOpen, IndianRupee, TrendingUp, BarChart3, Layout, ShieldCheck, Activity, Plus, ArrowUpRight, Search } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

export default function AdminDashboard() {
  return (
    <AdminProtectedRoute>
      <AdminDashboardContent />
    </AdminProtectedRoute>
  )
}

function AdminDashboardContent() {
  const [stats, setStats] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  const navigate = useNavigate()

  React.useEffect(() => {
    // Pure frontend stats calculation
    const courses = StorageService.getCourses()
    const enrollments = StorageService.getEnrollments()
    
    setStats({
      users: { students: 14202, admins: 12 },
      revenue: { total: enrollments.length * 499 },
      content: { courses: courses.length }
    })
    setLoading(false)
  }, [])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-surface">
      <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
    </div>
  )

  const metrics = [
    { label: "Active Learners", value: stats?.users?.students.toLocaleString(), icon: Users, trend: "+12.4%", color: "primary" },
    { label: "Operational Revenue", value: `₹${stats?.revenue?.total.toLocaleString()}`, icon: IndianRupee, trend: "+8.2%", color: "secondary" },
    { label: "Curriculum Assets", value: stats?.content?.courses, icon: BookOpen, trend: "+3", color: "primary" },
    { label: "Security Nodes", value: stats?.users?.admins, icon: ShieldCheck, trend: "Status 1.0", color: "secondary" },
  ]

  return (
    <main className="min-h-screen bg-surface pt-24 pb-20 px-8 font-body">
      <div className="max-w-7xl mx-auto">
        {/* Management Header */}
        <section className="mb-12 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold text-secondary uppercase tracking-[0.4em]">Proctor Command Center • Live</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-headline font-extrabold text-primary tracking-tighter italic">
              Platform Intelligence
            </h1>
            <p className="text-on-surface-variant text-lg font-medium opacity-60 mt-2">Overseeing global operational metrics and curriculum health.</p>
          </div>
          <div className="flex gap-4">
            <button className="px-8 py-4 bg-surface-container-low border border-surface-dim/20 rounded-2xl font-bold text-secondary text-sm hover:bg-surface-container transition-all flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Diagnostics
            </button>
            <Link to="/admin/courses" className="px-8 py-4 signature-gradient text-white rounded-2xl font-bold text-sm shadow-xl hover:opacity-90 active:scale-[0.98] transition-all flex items-center gap-2">
              <Plus className="w-4 h-4" />
              New Asset
            </Link>
          </div>
        </section>

        {/* Metrics Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {metrics.map((m, i) => (
            <div key={m.label} className="bg-surface-container-lowest p-8 rounded-[2.5rem] border border-surface-dim/20 shadow-xl shadow-primary/5 group hover:border-primary/20 transition-all">
              <div className="flex justify-between items-start mb-6">
                <div className={`w-12 h-12 rounded-2xl ${m.color === 'primary' ? 'bg-primary-fixed text-primary' : 'bg-surface-container-high text-secondary'} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <m.icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">{m.trend}</span>
              </div>
              <p className="text-[10px] font-bold text-outline uppercase tracking-[0.2em] mb-1">{m.label}</p>
              <p className="text-4xl font-headline font-extrabold text-primary tracking-tighter">{m.value}</p>
            </div>
          ))}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Traffic Shard */}
          <div className="lg:col-span-2 space-y-12">
            <div className="bg-surface-container-lowest p-10 rounded-[3rem] shadow-xl shadow-primary/5 border border-surface-dim/20 relative overflow-hidden h-[450px]">
              <div className="flex justify-between items-center mb-10 relative z-10">
                <h3 className="text-2xl font-headline font-bold text-primary italic flex items-center gap-3">
                  <BarChart3 className="w-6 h-6" />
                  Enrollment Velocity
                </h3>
                <div className="flex gap-2">
                  {['24H', '7D', '30D'].map(p => (
                    <button key={p} className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase transition-all ${p === '7D' ? 'bg-primary-container text-white' : 'text-secondary hover:bg-surface-container'}`}>{p}</button>
                  ))}
                </div>
              </div>
              
              <div className="flex-grow flex items-center justify-center h-64 border-2 border-dashed border-surface-dim/30 rounded-[2.5rem] relative">
                <div className="text-center opacity-30 group">
                  <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <p className="text-xs font-bold uppercase tracking-widest">Real-time Visualizer Initializing...</p>
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none"></div>
            </div>

            {/* Recent Protocols Table (Placeholder for content mgmt) */}
            <div className="bg-surface-container-lowest p-10 rounded-[3rem] shadow-xl shadow-primary/5 border border-surface-dim/20">
               <div className="flex justify-between items-center mb-8">
                 <h3 className="text-2xl font-headline font-bold text-primary italic">Operational Nodes</h3>
                 <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-outline group-focus-within:text-primary transition-colors" />
                    <input type="text" placeholder="Protocol search..." className="pl-11 pr-6 py-3 bg-surface-container-low border-none rounded-xl text-xs font-medium focus:ring-2 focus:ring-primary/10 transition-all w-64" />
                 </div>
               </div>
               <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center justify-between p-6 bg-surface-container-low/50 rounded-2xl hover:bg-surface-container-low transition-all group">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm">
                             <Layout className="w-5 h-5" />
                          </div>
                          <div>
                             <p className="text-sm font-bold text-primary">Advanced Security Protocol v.{i}.2</p>
                             <p className="text-[10px] font-bold text-outline uppercase tracking-widest mt-0.5">Updated 4h ago</p>
                          </div>
                       </div>
                       <button className="p-3 text-secondary hover:text-primary transition-colors">
                          <ArrowUpRight className="w-5 h-5" />
                       </button>
                    </div>
                  ))}
               </div>
            </div>
          </div>

          {/* Quick Stats Sidebar */}
          <div className="lg:col-span-1 space-y-8">
             <div className="bg-primary-container p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
                <div className="relative z-10">
                   <h4 className="text-[10px] font-bold text-white/40 uppercase tracking-[0.4em] mb-4">Tactical Status</h4>
                   <p className="text-5xl font-headline font-extrabold italic tracking-tighter mb-4 leading-none">99.8%</p>
                   <p className="text-sm font-medium opacity-60 leading-relaxed mb-8">Overall curriculum health index across all operational sectors.</p>
                   <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden mb-8">
                      <div className="h-full bg-white rounded-full animate-pulse" style={{ width: '99.8%' }} />
                   </div>
                   <button className="w-full py-4 bg-white/10 backdrop-blur-md rounded-2xl font-bold text-sm text-white hover:bg-white/20 transition-all uppercase tracking-widest">Generate Intel</button>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform"></div>
             </div>

             <div className="bg-surface-container-lowest p-10 rounded-[3rem] border border-surface-dim/20 shadow-xl shadow-primary/5">
                <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-8 italic">Recent Logs</h4>
                <div className="space-y-6">
                   {[
                     { label: 'Asset Node', detail: 'Cloud Sec v3 deployed', time: '12m ago' },
                     { label: 'Security', detail: 'Admin login detected', time: '45m ago' },
                     { label: 'Intel', detail: 'Revenue protocol run', time: '1h ago' },
                   ].map((log, i) => (
                     <div key={i} className="flex justify-between items-start border-l-2 border-primary/20 pl-4 py-1">
                        <div>
                           <p className="text-[10px] font-bold text-secondary uppercase tracking-widest leading-none mb-1">{log.label}</p>
                           <p className="text-xs font-bold text-primary">{log.detail}</p>
                        </div>
                        <span className="text-[10px] font-medium opacity-40 italic">{log.time}</span>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </div>
    </main>
  )
}
