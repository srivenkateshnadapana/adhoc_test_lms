// src/services/api.js
const API_URL = import.meta.env.VITE_API_URL || 'https://lms-backend-g1cy.onrender.com/api'

export const api = {
  // Auth endpoints
  auth: {
    login: async (email, password) => {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      return response.json()
    },
    register: async (userData) => {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      })
      return response.json()
    },
    getMe: async (token) => {
      const response = await fetch(`${API_URL}/auth/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      return response.json()
    }
  },

  // Course endpoints
  courses: {
    getAll: async () => {
      const response = await fetch(`${API_URL}/courses`)
      return response.json()
    },
    getById: async (id, token) => {
      const headers = token ? { 'Authorization': `Bearer ${token}` } : {}
      const response = await fetch(`${API_URL}/courses/${id}`, { headers })
      return response.json()
    },
    getMyCourses: async (token) => {
      const response = await fetch(`${API_URL}/courses/my-courses`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      return response.json()
    }
  },

  // Progress endpoints
  progress: {
    getCourseProgress: async (courseId, token) => {
      const response = await fetch(`${API_URL}/progress/course/${courseId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      return response.json()
    },
    markComplete: async (lessonId, token) => {
      const response = await fetch(`${API_URL}/progress/lesson/${lessonId}/complete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      return response.json()
    }
  },

  // Enrollment/Purchase
  enrollments: {
    purchase: async (courseId, plan, token) => {
      const response = await fetch(`${API_URL}/subscriptions/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ courseId, plan, paymentId: 'web_' + Date.now() })
      })
      return response.json()
    },
    checkAccess: async (courseId, token) => {
      const response = await fetch(`${API_URL}/subscriptions/course/${courseId}/access`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      return response.json()
    }
  },

  // Certificates
  certificates: {
    getMyCertificates: async (token) => {
      const response = await fetch(`${API_URL}/certificates/my`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      return response.json()
    },
    download: async (certificateId, token) => {
      const response = await fetch(`${API_URL}/certificates/${certificateId}/download`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      return response.blob()
    },
    generate: async (courseId, quizScore, token) => {
      const response = await fetch(`${API_URL}/certificates/generate/${courseId}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ quizScore })
      })
      return response.json()
    },
    verify: async (verificationCode) => {
      const response = await fetch(`${API_URL}/certificates/verify/${verificationCode}`)
      return response.json()
    }
  },

  // Quizzes (Student)
  quizzes: {
    getCourseQuizzes: async (courseId, token) => {
      const response = await fetch(`${API_URL}/quizzes/course/${courseId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      return response.json()
    },
    getQuiz: async (quizId, token) => {
      const response = await fetch(`${API_URL}/quizzes/${quizId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      return response.json()
    },
    submitQuiz: async (quizId, answers, token) => {
      const response = await fetch(`${API_URL}/quizzes/${quizId}/submit`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ answers })
      })
      return response.json()
    },
    getMyAttempts: async (token) => {
      const response = await fetch(`${API_URL}/quizzes/attempts/my`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      return response.json()
    }
  },

  // Admin endpoints
  admin: {
    getStats: async (token) => {
      const response = await fetch(`${API_URL}/admin/stats`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      return response.json()
    },
    getAnalytics: async (token) => {
      const response = await fetch(`${API_URL}/admin/analytics`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      return response.json()
    },
    // Courses
    createCourse: async (data, token) => {
      const response = await fetch(`${API_URL}/admin/courses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(data)
      })
      return response.json()
    },
    updateCourse: async (id, data, token) => {
      const response = await fetch(`${API_URL}/admin/courses/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(data)
      })
      return response.json()
    },
    deleteCourse: async (id, token) => {
      const response = await fetch(`${API_URL}/admin/courses/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      return response.json()
    },
    
    // Modules
    createModule: async (courseId, data, token) => {
      const response = await fetch(`${API_URL}/admin/courses/${courseId}/modules`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(data)
      })
      return response.json()
    },
    updateModule: async (id, data, token) => {
      const response = await fetch(`${API_URL}/admin/modules/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(data)
      })
      return response.json()
    },
    deleteModule: async (id, token) => {
      const response = await fetch(`${API_URL}/admin/modules/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      return response.json()
    },
    reorderModules: async (items, token) => {
      const response = await fetch(`${API_URL}/admin/modules/reorder`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ items })
      })
      return response.json()
    },

    // Lessons
    createLesson: async (moduleId, data, token) => {
      const response = await fetch(`${API_URL}/admin/modules/${moduleId}/lessons`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(data)
      })
      return response.json()
    },
    updateLesson: async (id, data, token) => {
      const response = await fetch(`${API_URL}/admin/lessons/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(data)
      })
      return response.json()
    },
    deleteLesson: async (id, token) => {
      const response = await fetch(`${API_URL}/admin/lessons/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      return response.json()
    },
    reorderLessons: async (items, token) => {
      const response = await fetch(`${API_URL}/admin/lessons/reorder`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ items })
      })
      return response.json()
    },

    // Quizzes
    createQuiz: async (data, token) => {
      const response = await fetch(`${API_URL}/quizzes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(data)
      })
      return response.json()
    },
    updateQuiz: async (id, data, token) => {
      const response = await fetch(`${API_URL}/quizzes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(data)
      })
      return response.json()
    },
    deleteQuiz: async (id, token) => {
      const response = await fetch(`${API_URL}/quizzes/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      return response.json()
    },
    reorderQuizzes: async (items, token) => {
      const response = await fetch(`${API_URL}/admin/quizzes/reorder`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ items })
      })
      return response.json()
    },

    // Questions
    createQuestion: async (quizId, data, token) => {
      const response = await fetch(`${API_URL}/quizzes/${quizId}/questions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ questions: [data] })
      })
      return response.json()
    },
    updateQuestion: async (id, data, token) => {
      const response = await fetch(`${API_URL}/quizzes/questions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(data)
      })
      return response.json()
    },
    deleteQuestion: async (id, token) => {
      const response = await fetch(`${API_URL}/quizzes/questions/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      return response.json()
    }
  },

  // Tickets / Doubts
  tickets: {
    // Student
    create: async (data, token) => {
      const response = await fetch(`${API_URL}/tickets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(data)
      })
      return response.json()
    },
    getMy: async (token) => {
      const response = await fetch(`${API_URL}/tickets/my`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      return response.json()
    },
    getById: async (ticketId, token) => {
      const response = await fetch(`${API_URL}/tickets/my/${ticketId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      return response.json()
    },
    // Admin
    getAll: async (token, filters = {}) => {
      const params = new URLSearchParams(filters).toString()
      const response = await fetch(`${API_URL}/tickets/all?${params}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      return response.json()
    },
    respond: async (ticketId, data, token) => {
      const response = await fetch(`${API_URL}/tickets/${ticketId}/respond`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(data)
      })
      return response.json()
    },
    updateStatus: async (ticketId, status, token) => {
      const response = await fetch(`${API_URL}/tickets/${ticketId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ status })
      })
      return response.json()
    },
    getStats: async (token) => {
      const response = await fetch(`${API_URL}/tickets/stats`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      return response.json()
    }
  }
}