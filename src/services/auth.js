// src/services/storage.js
import { api } from './api'

// Keys
const TOKEN_KEY = 'adhoc_token'
const USER_KEY = 'adhoc_user'

export const StorageService = {
  // Auth methods
  setToken: (token) => localStorage.setItem(TOKEN_KEY, token),
  getToken: () => localStorage.getItem(TOKEN_KEY),
  removeToken: () => localStorage.removeItem(TOKEN_KEY),
  
  setUser: (user) => localStorage.setItem(USER_KEY, JSON.stringify(user)),
  getUser: () => {
    const user = localStorage.getItem(USER_KEY)
    return user ? JSON.parse(user) : null
  },
  removeUser: () => localStorage.removeItem(USER_KEY),
  
  isAuthenticated: () => !!StorageService.getToken(),
  
  login: async (email, password) => {
    const data = await api.auth.login(email, password)
    if (data.success) {
      StorageService.setToken(data.token)
      StorageService.setUser(data.user)
      window.dispatchEvent(new Event('storage-update-adhoc-lms-auth'))
    }
    return data
  },
  
  register: async (userData) => {
    const data = await api.auth.register(userData)
    if (data.success) {
      StorageService.setToken(data.token)
      StorageService.setUser(data.user)
      window.dispatchEvent(new Event('storage-update-adhoc-lms-auth'))
    }
    return data
  },
  
  logout: () => {
    StorageService.removeToken()
    StorageService.removeUser()
    window.dispatchEvent(new Event('storage-update-adhoc-lms-auth'))
  },
  
  getAuthState: () => ({
    isAuthenticated: StorageService.isAuthenticated(),
    user: StorageService.getUser()
  }),

  // Course methods
  getCourses: async () => {
    const data = await api.courses.getAll()
    return data.data || []
  },
  
  getCourseById: async (id) => {
    const token = StorageService.getToken()
    const data = await api.courses.getById(id, token)
    return data.data
  },
  
  getEnrolledCourses: async () => {
    const token = StorageService.getToken()
    if (!token) return []
    const data = await api.courses.getMyCourses(token)
    return data.data || []
  },

  // Enrollment
  enroll: async (courseId, plan = '3months') => {
    const token = StorageService.getToken()
    const data = await api.enrollments.purchase(courseId, plan, token)
    if (data.success) {
      window.dispatchEvent(new Event('storage-update-adhoc-lms-enrollments'))
    }
    return data
  },
  
  isEnrolled: async (courseId) => {
    const token = StorageService.getToken()
    if (!token) return false
    const data = await api.enrollments.checkAccess(courseId, token)
    return data.hasAccess || false
  },

  // Progress
  getProgress: async (courseId) => {
    const token = StorageService.getToken()
    if (!token) return {}
    const data = await api.progress.getCourseProgress(courseId, token)
    const progressMap = {}
    data.data?.lessons?.forEach(lesson => {
      if (lesson.completed) progressMap[lesson.id] = 'completed'
    })
    return progressMap
  },
  
  updateProgress: async (courseId, lessonId) => {
    const token = StorageService.getToken()
    return await api.progress.markComplete(lessonId, token)
  },

  // Favorites (local only for now)
  getFavorites: () => {
    const favs = localStorage.getItem('adhoc_favorites')
    return favs ? JSON.parse(favs) : []
  },
  
  toggleFavorite: (courseId) => {
    const favs = StorageService.getFavorites()
    const index = favs.indexOf(courseId)
    if (index === -1) favs.push(courseId)
    else favs.splice(index, 1)
    localStorage.setItem('adhoc_favorites', JSON.stringify(favs))
    window.dispatchEvent(new Event('storage-update-adhoc-lms-favorites'))
  },
  
  isBookmarked: (courseId) => {
    const favs = StorageService.getFavorites()
    return favs.includes(courseId)
  }
}