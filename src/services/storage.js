// src/services/storage.js
import { api } from './api'

// Keys for localStorage
export const TOKEN_KEY = 'adhoc_token'
export const USER_KEY = 'adhoc_user'
export const FAVORITES_KEY = 'adhoc_favorites'
export const ENROLLMENTS_KEY = 'adhoc_enrollments'
export const AUTH_UPDATE_EVENT = 'storage-update-adhoc-lms-auth'

export const StorageService = {
  // ============ AUTHENTICATION ============
  
  setToken: (token) => {
    if (token) localStorage.setItem(TOKEN_KEY, token)
  },
  
  getToken: () => localStorage.getItem(TOKEN_KEY),
  
  removeToken: () => localStorage.removeItem(TOKEN_KEY),
  
  setUser: (user) => {
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user))
  },
  
  getUser: () => {
    const user = localStorage.getItem(USER_KEY)
    return user ? JSON.parse(user) : null
  },
  
  removeUser: () => localStorage.removeItem(USER_KEY),
  
  isAuthenticated: () => {
    return !!StorageService.getToken()
  },
  
  getAuthState: () => ({
    isAuthenticated: StorageService.isAuthenticated(),
    user: StorageService.getUser()
  }),
  
  login: async (email, password) => {
    try {
      const data = await api.auth.login(email, password)
      
      if (data.success) {
        StorageService.setToken(data.token)
        StorageService.setUser(data.user)
        window.dispatchEvent(new Event(AUTH_UPDATE_EVENT))
        return { success: true, user: data.user }
      } else {
        return { success: false, message: data.message || 'Login failed' }
      }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, message: 'Network error. Please try again.' }
    }
  },
  
  register: async (userData) => {
    try {
      const data = await api.auth.register(userData)
      
      if (data.success) {
        StorageService.setToken(data.token)
        StorageService.setUser(data.user)
        window.dispatchEvent(new Event(AUTH_UPDATE_EVENT))
        return { success: true, user: data.user }
      } else {
        return { success: false, message: data.message || 'Registration failed' }
      }
    } catch (error) {
      console.error('Register error:', error)
      return { success: false, message: 'Network error. Please try again.' }
    }
  },
  
  logout: () => {
    StorageService.removeToken()
    StorageService.removeUser()
    window.dispatchEvent(new Event(AUTH_UPDATE_EVENT))
  },
  
  // ============ COURSES ============
  
  getCourses: async () => {
    try {
      const data = await api.courses.getAll()
      return data.data || []
    } catch (error) {
      console.error('Error fetching courses:', error)
      return []
    }
  },
  
  getCourseById: async (id) => {
    try {
      const token = StorageService.getToken()
      const data = await api.courses.getById(id, token)
      return data.data
    } catch (error) {
      console.error('Error fetching course:', error)
      return null
    }
  },
  
  getEnrolledCourses: async () => {
    try {
      const token = StorageService.getToken()
      if (!token) return []
      const data = await api.courses.getMyCourses(token)
      return data.data || []
    } catch (error) {
      console.error('Error fetching enrolled courses:', error)
      return []
    }
  },
  
  isEnrolled: async (courseId) => {
    try {
      const token = StorageService.getToken()
      if (!token) return false
      const data = await api.enrollments.checkAccess(courseId, token)
      return data.hasAccess || false
    } catch (error) {
      console.error('Error checking enrollment:', error)
      return false
    }
  },

  enroll: async (courseId, plan = '3months') => {
    try {
      const token = StorageService.getToken()
      if (!token) return { success: false, message: 'Please login first' }
      
      const data = await api.enrollments.purchase(courseId, plan, token)
      
      if (data.success) {
        window.dispatchEvent(new Event(`storage-update-${ENROLLMENTS_KEY}`))
      }
      return data
    } catch (error) {
      console.error('Enrollment error:', error)
      return { success: false, message: 'Network error' }
    }
  },
  
  // ============ PROGRESS ============
  
  getProgress: async (courseId) => {
    try {
      const token = StorageService.getToken()
      if (!token) return {}
      const data = await api.progress.getCourseProgress(courseId, token)
      
      const progressMap = {}
      if (data.data?.lessons) {
        data.data.lessons.forEach(lesson => {
          if (lesson.completed) progressMap[lesson.id] = 'completed'
        })
      }
      return progressMap
    } catch (error) {
      console.error('Error fetching progress:', error)
      return {}
    }
  },
  
  updateProgress: async (courseId, lessonId) => {
    try {
      const token = StorageService.getToken()
      if (!token) return null
      
      return await api.progress.markComplete(lessonId, token)
    } catch (error) {
      console.error('Error updating progress:', error)
      return null
    }
  },
  
  // ============ FAVORITES (Local only) ============
  
  getFavorites: () => {
    const favs = localStorage.getItem(FAVORITES_KEY)
    return favs ? JSON.parse(favs) : []
  },
  
  toggleFavorite: (courseId) => {
    const favs = StorageService.getFavorites()
    const index = favs.indexOf(courseId)
    if (index === -1) {
      favs.push(courseId)
    } else {
      favs.splice(index, 1)
    }
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs))
    window.dispatchEvent(new Event(`storage-update-${FAVORITES_KEY}`))
  },
  
  isBookmarked: (courseId) => {
    const favs = StorageService.getFavorites()
    return favs.includes(courseId)
  }
}

// Export individual items for compatibility
export const getToken = () => StorageService.getToken()
export const getUser = () => StorageService.getUser()
export const isAuthenticated = () => StorageService.isAuthenticated()
export const logout = () => StorageService.logout()
export const AUTH_KEY = AUTH_UPDATE_EVENT 