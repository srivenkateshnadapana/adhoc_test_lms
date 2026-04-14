"use client"

// --- Constants ---
export const AUTH_KEY = "adhoc-lms-auth"
export const TOKEN_KEY = "adhoc-lms-token"
export const ENROLLMENTS_KEY = "adhoc-lms-enrollments"
export const FAVORITES_KEY = "adhoc-lms-favorites"
export const USERS_KEY = "adhoc-lms-users"

// --- Types ---
export interface MockUser {
  id: string
  name: string
  email: string
  password?: string
  image?: string
  role?: 'student' | 'admin'
}

export interface AuthState {
  isAuthenticated: boolean
  user: MockUser | null
}

// --- Utilities ---

const getStorage = <T>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback
  const item = localStorage.getItem(key)
  if (!item) return fallback
  try {
    return JSON.parse(item)
  } catch {
    return fallback
  }
}

const setStorage = (key: string, value: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value))
    window.dispatchEvent(new CustomEvent(`storage-update-${key}`, { detail: value }))
  }
}

// --- Auth Hub ---

export const StorageHub = {
  // Authentication
  getAuthState: (): AuthState => getStorage(AUTH_KEY, { isAuthenticated: false, user: null }),
  
  getToken: (): string | null => {
    if (typeof window === "undefined") return null
    return localStorage.getItem(TOKEN_KEY)
  },

  getMe: async (): Promise<MockUser | null> => {
    const token = StorageHub.getToken()
    if (!token) return null
    try {
      const response = await fetch('/api/auth/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await response.json()
      if (data.success) {
        return data.user
      }
      return null
    } catch {
      return null
    }
  },

  signup: async (user: MockUser): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          password: user.password
        })
      })
      const data = await response.json()
      if (data.success) {
        return { success: true }
      }
      return { success: false, error: data.message }
    } catch (err) {
      return { success: false, error: "Network error" }
    }
  },

  signin: async (email: string, password?: string): Promise<{ success: boolean; user?: MockUser; error?: string }> => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await response.json()
      if (data.success) {
        const state = { isAuthenticated: true, user: data.user }
        localStorage.setItem(TOKEN_KEY, data.token)
        setStorage(AUTH_KEY, state)
        return { success: true, user: data.user }
      }
      return { success: false, error: data.message }
    } catch (err) {
      return { success: false, error: "Network error" }
    }
  },

  socialLogin: (provider: string): { success: boolean; user: MockUser } => {
    const mockUser: MockUser = {
      id: "social-" + Math.random().toString(36).substr(2, 9),
      name: "Alex Smith",
      email: "alex@google.com",
      image: "https://lh3.googleusercontent.com/a/O-tN=s96-c",
      role: 'student'
    }
    const state = { isAuthenticated: true, user: mockUser }
    setStorage(AUTH_KEY, state)
    return { success: true, user: mockUser }
  },

  logout: () => {
    localStorage.removeItem(TOKEN_KEY)
    setStorage(AUTH_KEY, { isAuthenticated: false, user: null })
  },

  // Courses
  getAllCourses: async (): Promise<any[]> => {
    try {
      const response = await fetch('/api/courses')
      const data = await response.json()
      return data.success ? data.data : []
    } catch {
      return []
    }
  },

  getCourseById: async (id: string): Promise<any> => {
    const token = StorageHub.getToken()
    try {
      const headers: any = {}
      if (token) headers['Authorization'] = `Bearer ${token}`
      
      const response = await fetch(`/api/courses/${id}`, { headers })
      const data = await response.json()
      return data.success ? data.data : null
    } catch {
      return null
    }
  },

  // Enrollments
  getEnrollments: async (): Promise<any[]> => {
    const token = StorageHub.getToken()
    if (!token) return []
    try {
      const response = await fetch('/api/courses/my-courses', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await response.json()
      if (data.success) {
        return data.data
      }
      return []
    } catch {
      return []
    }
  },
  
  enroll: async (courseId: string) => {
    const token = StorageHub.getToken()
    if (!token) return
    try {
      await fetch('/api/subscriptions/create', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          courseId, 
          plan: '1month',
          amount: 499 
        })
      })
      window.dispatchEvent(new CustomEvent('enrollment-update'))
    } catch (err) {
      console.error("Enrollment failed", err)
    }
  },

  isEnrolled: (courseId: string): boolean => {
    return getStorage<string[]>(ENROLLMENTS_KEY, []).includes(courseId)
  },

  // Favorites
  getFavorites: (): string[] => getStorage(FAVORITES_KEY, []),
  
  toggleFavorite: (courseId: string) => {
    const current = getStorage<string[]>(FAVORITES_KEY, [])
    const index = current.indexOf(courseId)
    if (index === -1) {
      current.push(courseId)
    } else {
      current.splice(index, 1)
    }
    setStorage(FAVORITES_KEY, current)
  },

  // --- Administration ---

  getAdminStats: async () => {
    const token = StorageHub.getToken()
    if (!token) return null
    try {
      const response = await fetch('/api/admin/stats', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await response.json()
      return data.success ? data.data : null
    } catch {
      return null
    }
  },

  getAdminAnalytics: async () => {
    const token = StorageHub.getToken()
    if (!token) return null
    try {
      const response = await fetch('/api/admin/analytics', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await response.json()
      return data.success ? data.data : null
    } catch {
      return null
    }
  },

  createCourse: async (courseData: any) => {
    const token = StorageHub.getToken()
    if (!token) return { success: false }
    try {
      const response = await fetch('/api/admin/courses', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(courseData)
      })
      return await response.json()
    } catch {
      return { success: false }
    }
  },

  updateCourse: async (id: string, courseData: any) => {
    const token = StorageHub.getToken()
    if (!token) return { success: false }
    try {
      const response = await fetch(`/api/admin/courses/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(courseData)
      })
      return await response.json()
    } catch {
      return { success: false }
    }
  },

  deleteCourse: async (id: string) => {
    const token = StorageHub.getToken()
    if (!token) return { success: false }
    try {
      const response = await fetch(`/api/admin/courses/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      return await response.json()
    } catch {
      return { success: false }
    }
  }
}

