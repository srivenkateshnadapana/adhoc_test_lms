import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { Toaster } from 'sonner'
import { BottomNav } from './components/layout/BottomNav'

// Pages
import Home from './pages/public/Home'
import Catalog from './pages/public/Catalog'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import CourseDetail from './pages/public/CourseDetail'
import NotFound from './pages/public/NotFound'
import Unauthorized from './pages/public/Unauthorized'
import Dashboard from './pages/student/Dashboard'
import Profile from './pages/student/Profile'
import CoursePlayer from './pages/student/CoursePlayer'
import AdminDashboard from './pages/admin/AdminDashboard'
import MyCourses from './pages/student/MyCourses'
import Certificates from './pages/student/Certificates'
import MyDoubts from './pages/student/MyDoubts'
import Settings from './pages/student/Settings'
import Referral from './pages/student/Referral'
import AdminCourses from './pages/admin/AdminCourses'
import AdminCourseManager from './pages/admin/AdminCourseManager'
import AdminDoubts from './pages/admin/AdminDoubts'
import VerifyCertificate from './pages/public/VerifyCertificate'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-surface font-body text-on-surface transition-colors duration-300 flex flex-col">
        <Header />
        <main className="pt-16 pb-16 md:pb-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/course/:id" element={<CourseDetail />} />
            <Route path="/verify-certificate" element={<VerifyCertificate />} />
            <Route path="/verify-certificate/:code" element={<VerifyCertificate />} />
            <Route path="/auth" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/auth/register" element={<Navigate to="/register" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/student/course/:id" element={<CoursePlayer />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/my-courses" element={<MyCourses />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/my-doubts" element={<MyDoubts />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/referral" element={<Referral />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/courses" element={<AdminCourses />} />
            <Route path="/admin/courses/:id" element={<AdminCourseManager />} />
            <Route path="/admin/doubts" element={<AdminDoubts />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </main>
        <Footer />
        <BottomNav />
        <Toaster position="top-right" />
      </div>
    </Router>
  )
}

export default App
