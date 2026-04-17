import { getStorage, setStorage, removeStorage } from '../utils/storage'
import { INITIAL_COURSES } from './initialData'

// --- Keys ---
export const AUTH_KEY = "adhoc-lms-auth"
export const TOKEN_KEY = "adhoc-lms-token"
export const ENROLLMENTS_KEY = "adhoc-lms-enrollments"
export const FAVORITES_KEY = "adhoc-lms-favorites"
export const PROGRESS_KEY = "adhoc-lms-progress"
export const COURSES_KEY = "adhoc-lms-courses"

/**
 * Domain-specific storage service (Pure Frontend implementation)
 */
export const StorageService = {
  // --- Authentication ---
  getAuthState: () => getStorage(AUTH_KEY, { isAuthenticated: false, user: null }),
  
  setAuthState: (state) => setStorage(AUTH_KEY, state),
  
  getToken: () => getStorage(TOKEN_KEY),
  
  setToken: (token) => setStorage(TOKEN_KEY, token),
  
  logout: () => {
    removeStorage(TOKEN_KEY)
    removeStorage(AUTH_KEY)
  },

  // --- Courses ---
  getCourses: () => {
    const existing = getStorage(COURSES_KEY)
    if (!existing || existing.length === 0) {
      setStorage(COURSES_KEY, INITIAL_COURSES)
      return INITIAL_COURSES
    }
    return existing
  },
  
  saveCourses: (courses) => setStorage(COURSES_KEY, courses),
  
  getCourseById: (id) => {
    const courses = StorageService.getCourses()
    return courses.find(c => c.id === id || c.id === Number(id))
  },

  // --- Enrollments ---
  getEnrollments: () => getStorage(ENROLLMENTS_KEY, []),
  
  enroll: (courseId) => {
    const enrollments = StorageService.getEnrollments()
    if (!enrollments.includes(courseId)) {
      enrollments.push(courseId)
      setStorage(ENROLLMENTS_KEY, enrollments)
    }
  },
  
  isEnrolled: (courseId) => StorageService.getEnrollments().includes(courseId),

  // --- Favorites ---
  getFavorites: () => getStorage(FAVORITES_KEY, []),
  
  toggleFavorite: (courseId) => {
    const favorites = StorageService.getFavorites()
    const index = favorites.indexOf(courseId)
    if (index === -1) {
      favorites.push(courseId)
    } else {
      favorites.splice(index, 1)
    }
    setStorage(FAVORITES_KEY, favorites)
  },

  // --- Progress ---
  getProgress: () => getStorage(PROGRESS_KEY, {}),
  
  updateProgress: (courseId, lessonId, status = 'completed') => {
    const progress = StorageService.getProgress()
    if (!progress[courseId]) progress[courseId] = {}
    progress[courseId][lessonId] = status
    setStorage(PROGRESS_KEY, progress)
  }
}
