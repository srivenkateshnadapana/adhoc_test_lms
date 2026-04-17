import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { Toaster } from 'sonner'

// Pages
import Home from './pages/public/Home'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import CourseDetail from './pages/public/CourseDetail'
import NotFound from './pages/public/NotFound'
import Unauthorized from './pages/public/Unauthorized'
import Dashboard from './pages/student/Dashboard'
import Profile from './pages/student/Profile'
import CoursePlayer from './pages/student/CoursePlayer'
import AdminDashboard from './pages/admin/AdminDashboard'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-surface font-body text-on-surface transition-colors duration-300 flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Home />} />
            <Route path="/course/:id" element={<CourseDetail />} />
            <Route path="/auth" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/auth/register" element={<Navigate to="/register" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/student/course/:id" element={<CoursePlayer />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </main>
        <Footer />
        <Toaster position="top-right" />
      </div>
    </Router>
  )
}

export default App
