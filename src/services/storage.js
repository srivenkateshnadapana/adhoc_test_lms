// src/services/storage.js
const API_URL = import.meta.env.VITE_API_URL || 'https://lms-backend-g1cy.onrender.com/api'

// Keys for localStorage
export const TOKEN_KEY = 'lms_token'
export const USER_KEY = 'lms_user'
export const FAVORITES_KEY = 'lms_favorites'
export const AUTH_KEY = 'lms_auth'
export const ENROLLMENTS_KEY = 'lms_enrollments'

const _cache = {
  courses: null,
  courseDetails: {}, // Cache for individual course details
  lastFetched: 0
}
const CACHE_DURATION = 10 * 60 * 1000 // 10 minutes

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
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      
      const data = await response.json()
      
      if (data.success) {
        StorageService.setToken(data.token)
        StorageService.setUser(data.user)
        window.dispatchEvent(new Event(`storage-update-${AUTH_KEY}`))
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
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: userData.name,
          email: userData.email,
          password: userData.password,
          role: userData.role || 'student',
          referralCode: userData.referralCode
        })
      })
      
      const data = await response.json()
      
      if (data.success) {
        StorageService.setToken(data.token)
        StorageService.setUser(data.user)
        window.dispatchEvent(new Event(`storage-update-${AUTH_KEY}`))
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
    window.dispatchEvent(new Event(`storage-update-${AUTH_KEY}`))
  },

  // ============ COURSES ============
  
  getCourses: async (forceRefresh = false) => {
    try {
      const now = Date.now()
      if (!forceRefresh && _cache.courses && (now - _cache.lastFetched < CACHE_DURATION)) {
        return _cache.courses
      }

      const response = await fetch(`${API_URL}/courses`)
      if (!response.ok) throw new Error('Network response was not ok')
      
      const data = await response.json()
      const raw = data.data || []

      const mappedCourses = raw.map(course => ({
        id: course.id,
        title: course.title || 'Untitled Course',
        description: course.description || '',
        image: course.thumbnail || null,
        instructor: course.instructor || 'Expert Instructor',
        price: parseFloat(course.price_3months) || parseFloat(course.price_1month) || 0,
        originalPrice: parseFloat(course.price_6months) || null,
        price_1month: parseFloat(course.price_1month) || 0,
        price_3months: parseFloat(course.price_3months) || 0,
        price_6months: parseFloat(course.price_6months) || 0,
        category: course.category || (course.course_type === 'mega' ? 'development' : course.course_type === 'mini' ? 'design' : 'business'),
        course_type: course.course_type,
        allowed_plan: course.allowed_plan,
        level: course.level || 'intermediate',
        duration: course.duration || 20,
        rating: course.rating || 4.5,
        reviewCount: course.review_count || 0,
        enrolled: course.enrolled || 0,
        createdAt: course.createdAt,
        userAccess: course.userAccess || { hasAccess: false }
      }))

      _cache.courses = mappedCourses
      _cache.lastFetched = now
      return mappedCourses
    } catch (error) {
      console.error('Error fetching courses:', error)
      return _cache.courses || []
    }
  },
  
  getCourseById: async (id) => {
    const courseId = parseInt(id)
    
    if (_cache.courseDetails[courseId]) {
      return _cache.courseDetails[courseId]
    }

    if (_cache.courses) {
      const cached = _cache.courses.find(c => c.id === courseId)
      if (cached) return cached
    }

    try {
      const token = StorageService.getToken()
      const headers = token ? { 'Authorization': `Bearer ${token}` } : {}
      const response = await fetch(`${API_URL}/courses/${courseId}`, { headers })
      
      if (response.ok) {
        const data = await response.json()
        if (data && data.data) {
          _cache.courseDetails[courseId] = data.data
          return data.data
        }
      }
      
      const courses = await StorageService.getCourses(true)
      const found = courses.find(c => c.id === courseId)
      if (found) {
        _cache.courseDetails[courseId] = found
        return found
      }
      
      return null
    } catch (error) {
      console.error('Error fetching course:', error)
      return _cache.courses?.find(c => c.id === courseId) || null
    }
  },
  
  getEnrolledCourses: async () => {
    try {
      const token = StorageService.getToken()
      if (!token) return []
      const response = await fetch(`${API_URL}/courses/my-courses`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await response.json()
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
      const response = await fetch(`${API_URL}/subscriptions/course/${courseId}/access`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await response.json()
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
      
      const response = await fetch(`${API_URL}/payments/mock-purchase`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          courseId: parseInt(courseId), 
          plan: plan, 
          paymentId: 'web_' + Date.now() 
        })
      })
      
      const data = await response.json()
      
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
      const response = await fetch(`${API_URL}/progress/course/${courseId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await response.json()
      
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
      
      const response = await fetch(`${API_URL}/progress/lesson/${lessonId}/complete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      return await response.json()
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
  },
  
  // ============ ENROLLMENT ============
  
  // Get enrollments (IDs only)
  getEnrollments: () => {
    const enrolled = localStorage.getItem(ENROLLMENTS_KEY)
    return enrolled ? JSON.parse(enrolled) : []
  },
  
  // Add enrollment ID
  addEnrollment: (courseId) => {
    const enrollments = StorageService.getEnrollments()
    if (!enrollments.includes(courseId)) {
      enrollments.push(courseId)
      localStorage.setItem(ENROLLMENTS_KEY, JSON.stringify(enrollments))
    }
  }
}

// Export individual items for direct imports
export const getToken = () => StorageService.getToken()
export const getUser = () => StorageService.getUser()
export const isAuthenticated = () => StorageService.isAuthenticated()
export const logout = () => StorageService.logout()