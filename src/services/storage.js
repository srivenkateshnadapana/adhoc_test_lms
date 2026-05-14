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
    const raw = localStorage.getItem(USER_KEY)
    if (!raw) return null
    try {
      const parsedUser = JSON.parse(raw)
      if (parsedUser && typeof parsedUser.coins === 'undefined') {
        parsedUser.coins = 0 // Default coins
      }
      return parsedUser
    } catch {
      // Corrupted data — clear it so the app recovers on next login
      localStorage.removeItem(USER_KEY)
      return null
    }
  },
  
  updateUser: (updates) => {
    const user = StorageService.getUser()
    if (user) {
      const updatedUser = { ...user, ...updates }
      StorageService.setUser(updatedUser)
      window.dispatchEvent(new Event(`storage-update-${AUTH_KEY}`))
    }
  },

  getCoins: () => {
    return StorageService.getUser()?.coins || 0
  },

  addCoins: (amount) => {
    const user = StorageService.getUser()
    if (user) {
      StorageService.updateUser({ coins: (user.coins || 0) + amount })
    }
  },

  useCoins: (amount) => {
    const user = StorageService.getUser()
    if (user && (user.coins || 0) >= amount) {
      StorageService.updateUser({ coins: user.coins - amount })
      return true
    }
    return false
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

  forgotPassword: async (email) => {
    try {
      const response = await fetch(`${API_URL}/password/forgot`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Forgot password error:', error)
      return { success: false, message: 'Network error. Please try again.' }
    }
  },

  resetPassword: async (token, newPassword) => {
    try {
      const response = await fetch(`${API_URL}/password/reset/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword })
      })
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Reset password error:', error)
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

      const mappedCourses = raw.map(course => {
        const allowedPlan = course.allowed_plan || '1month';
        let displayPrice = 0;
        if (allowedPlan === '1month') displayPrice = parseFloat(course.price_1month);
        else if (allowedPlan === '3months') displayPrice = parseFloat(course.price_3months);
        else if (allowedPlan === '6months') displayPrice = parseFloat(course.price_6months);
        
        displayPrice = displayPrice || parseFloat(course.price_1month) || 0;

        return {
          id: course.id,
          title: course.title || 'Untitled Course',
          description: course.description || '',
          image: course.thumbnail || null,
          instructor: course.instructor || 'Expert Instructor',
          price: displayPrice,
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
        };
      })

      _cache.courses = mappedCourses
      _cache.lastFetched = now
      return mappedCourses
    } catch (error) {
      console.error('Error fetching courses:', error)
      return _cache.courses || []
    }
  },
  
  getCourseById: async (id, forceRefresh = false) => {
    const courseId = parseInt(id)
    
    if (!forceRefresh && _cache.courseDetails[courseId]) {
      return _cache.courseDetails[courseId]
    }

    if (!forceRefresh && _cache.courses) {
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
  // In storage.js
  enroll: async (courseId, plan = '3months', price = 0, coinsUsed = 0) => {
    return new Promise(async (resolve) => {
      try {
        const token = StorageService.getToken()
        if (!token) return resolve({ success: false, message: 'Please login first' })
        
        // 1. Create Order
        const orderRes = await fetch(`${API_URL}/payments/create-order`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ courseId: parseInt(courseId), plan, coinsUsed: coinsUsed || 0 })
        })
        const orderData = await orderRes.json()
        
        if (!orderData.success) {
          return resolve(orderData)
        }

        // 2. Handle Free or Fully Discounted Case
        if (orderData.isFree) {
          const verifyRes = await fetch(`${API_URL}/payments/verify`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ courseId: parseInt(courseId), plan, coinsUsed: coinsUsed || 0 })
          })
          const verifyData = await verifyRes.json()
          if (verifyData.success) {
            if (coinsUsed > 0) StorageService.useCoins(coinsUsed)
            window.dispatchEvent(new Event(`storage-update-${ENROLLMENTS_KEY}`))
          }
          return resolve(verifyData)
        }

        // 3. Initialize Razorpay Checkout
        if (typeof window === 'undefined' || !window.Razorpay) {
          return resolve({ 
            success: false, 
            message: 'Payment system not ready. Please refresh the page or check your internet connection.' 
          })
        }

        const options = {
          key: orderData.keyId,
          amount: orderData.order.amount,
          currency: orderData.order.currency,
          name: "Adhoc Network Tech",
          description: "Course Enrollment",
          order_id: orderData.order.id,
          handler: async function (response) {
            try {
              // 4. Verify Payment on Backend
              const verifyRes = await fetch(`${API_URL}/payments/verify`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  courseId: parseInt(courseId),
                  plan,
                  coinsUsed: coinsUsed || 0
                })
              })
              const verifyData = await verifyRes.json()
              if (verifyData.success) {
                if (coinsUsed > 0) StorageService.useCoins(coinsUsed)
                window.dispatchEvent(new Event(`storage-update-${ENROLLMENTS_KEY}`))
              }
              resolve(verifyData)
            } catch (err) {
              console.error('Payment verification error', err)
              resolve({ success: false, message: 'Payment verification failed' })
            }
          },
          modal: {
            // User closed the Razorpay popup without completing payment
            ondismiss: function () {
              resolve({ success: false, message: 'cancelled' })
            }
          },
          prefill: {
            name: StorageService.getUser()?.name || "",
            email: StorageService.getUser()?.email || ""
          },
          theme: {
            color: "#0052cc"
          }
        }

        const rzp = new window.Razorpay(options)
        rzp.on('payment.failed', function (response) {
          console.error(response.error)
          resolve({ success: false, message: response.error.description || 'Payment failed' })
        })
        rzp.open()
        
      } catch (error) {
        console.error('Enrollment error:', error)
        resolve({ success: false, message: 'Network error' })
      }
    })
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
    const raw = localStorage.getItem(FAVORITES_KEY)
    if (!raw) return []
    try {
      const parsed = JSON.parse(raw)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      localStorage.removeItem(FAVORITES_KEY)
      return []
    }
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
  
  // Duplicate enroll removed. (it's already defined above)
  // Get enrollments (IDs only)
  getEnrollments: () => {
    const raw = localStorage.getItem(ENROLLMENTS_KEY)
    if (!raw) return []
    try {
      const parsed = JSON.parse(raw)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      localStorage.removeItem(ENROLLMENTS_KEY)
      return []
    }
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