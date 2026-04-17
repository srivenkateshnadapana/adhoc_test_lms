import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Header } from './components/layout/Header'
import { Toaster } from 'sonner'

// Pages
import Home from './pages/public/Home'
import Catalog from './pages/public/Catalog'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import CourseDetail from './pages/public/CourseDetail'
import Dashboard from './pages/student/Dashboard'
import Profile from './pages/student/Profile'
import CoursePlayer from './pages/student/CoursePlayer'
import AdminDashboard from './pages/admin/AdminDashboard'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background font-body text-foreground transition-colors duration-300">
        <Header />
        <main className="pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/course/:id" element={<CourseDetail />} />
            <Route path="/auth" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/student/course/:id" element={<CoursePlayer />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Toaster position="top-right" />
      </div>
    </Router>
  )
}

export default App
