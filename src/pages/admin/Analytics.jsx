import React, { useState, useEffect } from 'react'
import { AdminProtectedRoute } from "../../context/AdminProtectedRoute"
import { StorageService } from "../../services/storage"
import { api } from "../../services/api"
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell, LineChart, Line 
} from 'recharts'
import { 
  TrendingUp, Users, BookOpen, IndianRupee, ArrowUpRight, 
  ArrowDownRight, Calendar, Filter, Download, Activity, Shield 
} from 'lucide-react'

export default function Analytics() {
  return (
    <AdminProtectedRoute>
      <AnalyticsContent />
    </AdminProtectedRoute>
  )
}

function AnalyticsContent() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('7D')

  useEffect(() => {
    loadAnalytics()
  }, [])

  const loadAnalytics = async () => {
    try {
      setLoading(true)
      const token = StorageService.getToken()
      const res = await api.admin.getAnalytics(token)
      if (res.success) {
        setData(res.data)
      }
    } catch (err) {
      console.error("Failed to load analytics", err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <Activity className="w-12 h-12 text-primary animate-spin" />
      </div>
    )
  }

  // Mock data for visualizations if backend is sparse
  const enrollmentData = data?.monthlyRevenue || [
    { month: 'Jan', revenue: 4500, enrollments: 120 },
    { month: 'Feb', revenue: 5200, enrollments: 145 },
    { month: 'Mar', revenue: 4800, enrollments: 130 },
    { month: 'Apr', revenue: 6100, enrollments: 170 },
    { month: 'May', revenue: 5900, enrollments: 160 },
    { month: 'Jun', revenue: 7500, enrollments: 210 },
  ]

  const categoryData = [
    { name: 'Cybersecurity', value: 45, color: '#001529' },
    { month: 'Cloud Infra', value: 25, color: '#00284d' },
    { month: 'AI Matrix', value: 20, color: '#003b71' },
    { month: 'DevOps', value: 10, color: '#004e95' },
  ]

  return (
    <div className="min-h-screen bg-surface pt-24 pb-20 px-8 font-body">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <h2 className="text-[10px] font-bold text-secondary uppercase tracking-[0.4em]">Operations Intel</h2>
            </div>
            <h1 className="text-5xl font-headline font-extrabold text-primary tracking-tighter italic">Strategic Analytics</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex bg-surface-container rounded-2xl p-1 border border-surface-dim/20">
              {['24H', '7D', '30D', 'ALL'].map(range => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 rounded-xl text-[10px] font-bold transition-all ${timeRange === range ? 'bg-primary text-white shadow-lg' : 'text-secondary hover:text-primary'}`}
                >
                  {range}
                </button>
              ))}
            </div>
            <button className="p-3 bg-surface-container-lowest border border-surface-dim/20 rounded-2xl text-primary hover:bg-surface-container transition-colors shadow-sm">
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Top Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total Revenue', value: '₹75,240', trend: '+12.5%', icon: IndianRupee, color: 'emerald' },
            { label: 'Active Learners', value: '1,429', trend: '+8.2%', icon: Users, color: 'blue' },
            { label: 'Asset Utilization', value: '84.2%', trend: '+3.1%', icon: BookOpen, color: 'indigo' },
            { label: 'System Health', value: '99.9%', trend: 'Stable', icon: Shield, color: 'emerald' },
          ].map((stat, i) => (
            <div key={i} className="bg-surface-container-lowest p-8 rounded-[2.5rem] border border-surface-dim/20 shadow-xl shadow-primary/5 hover:border-primary/20 transition-all">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-surface-container rounded-2xl flex items-center justify-center text-primary shadow-inner">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className={`flex items-center gap-1 text-[10px] font-bold ${stat.color === 'emerald' ? 'text-emerald-600' : 'text-blue-600'}`}>
                   {stat.trend.startsWith('+') ? <ArrowUpRight className="w-3 h-3" /> : <Activity className="w-3 h-3" />}
                   {stat.trend}
                </div>
              </div>
              <p className="text-[10px] font-bold text-outline uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-3xl font-headline font-bold text-primary tracking-tighter">{stat.value}</h3>
            </div>
          ))}
        </div>

        {/* Main Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Revenue Velocity Chart */}
          <div className="lg:col-span-2 bg-surface-container-lowest p-10 rounded-[3rem] border border-surface-dim/20 shadow-xl shadow-primary/5">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-xl font-headline font-bold text-primary italic flex items-center gap-3">
                <TrendingUp className="w-5 h-5" /> Enrollment Velocity
              </h3>
            </div>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={enrollmentData}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#001529" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#001529" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 'bold', fill: '#5e5e5f' }} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 'bold', fill: '#5e5e5f' }} 
                  />
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '16px', 
                      border: 'none', 
                      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                      fontFamily: 'Manrope'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#001529" 
                    strokeWidth={4}
                    fillOpacity={1} 
                    fill="url(#colorRev)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category Distribution Chart */}
          <div className="bg-surface-container-lowest p-10 rounded-[3rem] border border-surface-dim/20 shadow-xl shadow-primary/5">
             <h3 className="text-xl font-headline font-bold text-primary italic mb-10">Curriculum Focus</h3>
             <div className="h-[250px] w-full mb-8">
               <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                    <Pie
                      data={categoryData}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={8}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                 </PieChart>
               </ResponsiveContainer>
             </div>
             <div className="space-y-4">
               {categoryData.map((cat, i) => (
                 <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                      <span className="text-xs font-bold text-primary">{cat.month || cat.name}</span>
                    </div>
                    <span className="text-xs font-bold text-secondary">{cat.value}%</span>
                 </div>
               ))}
             </div>
          </div>
        </div>

        {/* Secondary Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <div className="bg-surface-container-lowest p-10 rounded-[3rem] border border-surface-dim/20 shadow-xl shadow-primary/5">
              <h3 className="text-xl font-headline font-bold text-primary italic mb-10">Peak Activity Hours</h3>
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { hour: '08:00', load: 30 },
                    { hour: '12:00', load: 85 },
                    { hour: '16:00', load: 60 },
                    { hour: '20:00', load: 95 },
                    { hour: '00:00', load: 40 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold' }} />
                    <Tooltip />
                    <Bar dataKey="load" fill="#001529" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
           </div>
           
           <div className="bg-surface-container-lowest p-10 rounded-[3rem] border border-surface-dim/20 shadow-xl shadow-primary/5 flex flex-col justify-center text-center">
              <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-10 h-10 text-emerald-600" />
              </div>
              <h4 className="text-2xl font-headline font-bold text-primary mb-2 italic">Intelligence Summary</h4>
              <p className="text-on-surface-variant max-w-sm mx-auto leading-relaxed">
                Platform metrics identify <span className="font-bold text-primary">Cybersecurity</span> as the highest conversion vector this quarter. Recommendation: Increase asset allocation in Cloud Security modules.
              </p>
              <button className="mt-8 mx-auto px-8 py-3 signature-gradient text-white rounded-xl font-bold flex items-center gap-2">
                Generate Full PDF Report <ArrowUpRight className="w-4 h-4" />
              </button>
           </div>
        </div>
      </div>
    </div>
  )
}
