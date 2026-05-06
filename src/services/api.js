// src/services/api.js
const API_URL = import.meta.env.VITE_API_URL || 'https://lms-backend-g1cy.onrender.com/api'

const handleResponse = async (response) => {
  if (!response.ok) {
    throw new Error(response.statusText || `Request failed with status ${response.status}`);
  }
  return response.json();
};

export const api = {
  // Auth endpoints
  auth: {
    login: async (email, password) => {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      return handleResponse(response)
    },
    register: async (userData) => {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      })
      return handleResponse(response)
    },
    getMe: async (token) => {
      const response = await fetch(`${API_URL}/auth/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      return handleResponse(response)
    },
    changePassword: async (currentPassword, newPassword, token) => {
      const response = await fetch(`${API_URL}/password/change`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ currentPassword, newPassword })
      })
      return handleResponse(response)
    }
  },

  // Course endpoints
  courses: {
    getAll: async () => {
      const response = await fetch(`${API_URL}/courses`)
      return handleResponse(response)
    },
    getById: async (id, token) => {
      const headers = token ? { 'Authorization': `Bearer ${token}` } : {}
      const response = await fetch(`${API_URL}/courses/${id}`, { headers })
      return handleResponse(response)
    },
    getMyCourses: async (token) => {
      const response = await fetch(`${API_URL}/courses/my-courses`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      return handleResponse(response)
    }
  },

  // Progress endpoints
  progress: {
    getCourseProgress: async (courseId, token) => {
      const response = await fetch(`${API_URL}/progress/course/${courseId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      return handleResponse(response)
    },
    markComplete: async (lessonId, token) => {
      const response = await fetch(`${API_URL}/progress/lesson/${lessonId}/complete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      return handleResponse(response)
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
      return handleResponse(response)
    },
    checkAccess: async (courseId, token) => {
      const response = await fetch(`${API_URL}/subscriptions/course/${courseId}/access`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      return handleResponse(response)
    }
  },

  // Certificates
  certificates: {
    getMyCertificates: async (token) => {
      const response = await fetch(`${API_URL}/certificates/my`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      return handleResponse(response)
    },
    download: async (certificateId, token) => {
      const response = await fetch(`${API_URL}/certificates/${certificateId}/download`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (!response.ok) throw new Error(response.statusText || 'Download failed');
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
      return handleResponse(response)
    },
    verify: async (verificationCode) => {
      const response = await fetch(`${API_URL}/certificates/verify/${verificationCode}`)
      return handleResponse(response)
    }
  },

  // Quizzes (Student)
  quizzes: {
    getCourseQuizzes: async (courseId, token) => {
      const response = await fetch(`${API_URL}/quizzes/course/${courseId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      return handleResponse(response)
    },
    getQuiz: async (quizId, token) => {
      const response = await fetch(`${API_URL}/quizzes/${quizId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      return handleResponse(response)
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
      return handleResponse(response)
    },
    getMyAttempts: async (token) => {
      const response = await fetch(`${API_URL}/quizzes/attempts/my`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      return handleResponse(response)
    }
  },

  // Admin endpoints
  admin: {
    getStats: async (token) => {
      const response = await fetch(`${API_URL}/admin/stats`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      return handleResponse(response)
    },
    getAnalytics: async (token) => {
      const response = await fetch(`${API_URL}/admin/analytics`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      return handleResponse(response)
    },
    // Courses
    createCourse: async (data, token) => {
      const response = await fetch(`${API_URL}/admin/courses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(data)
      })
      return handleResponse(response)
    },
    updateCourse: async (id, data, token) => {
      const response = await fetch(`${API_URL}/admin/courses/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(data)
      })
      return handleResponse(response)
    },
    deleteCourse: async (id, token) => {
      const response = await fetch(`${API_URL}/admin/courses/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      return handleResponse(response)
    },
    
    // Modules
    createModule: async (courseId, data, token) => {
      const response = await fetch(`${API_URL}/admin/courses/${courseId}/modules`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(data)
      })
      return handleResponse(response)
    },
    updateModule: async (id, data, token) => {
      const response = await fetch(`${API_URL}/admin/modules/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(data)
      })
      return handleResponse(response)
    },
    deleteModule: async (id, token) => {
      const response = await fetch(`${API_URL}/admin/modules/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      return handleResponse(response)
    },
    reorderModules: async (items, token) => {
      const response = await fetch(`${API_URL}/admin/modules/reorder`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ items })
      })
      return handleResponse(response)
    },

    // Lessons
    createLesson: async (moduleId, data, token) => {
      const response = await fetch(`${API_URL}/admin/modules/${moduleId}/lessons`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(data)
      })
      return handleResponse(response)
    },
    updateLesson: async (id, data, token) => {
      const response = await fetch(`${API_URL}/admin/lessons/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(data)
      })
      return handleResponse(response)
    },
    deleteLesson: async (id, token) => {
      const response = await fetch(`${API_URL}/admin/lessons/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      return handleResponse(response)
    },
    reorderLessons: async (items, token) => {
      const response = await fetch(`${API_URL}/admin/lessons/reorder`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ items })
      })
      return handleResponse(response)
    },

    // Quizzes
    createQuiz: async (data, token) => {
      const response = await fetch(`${API_URL}/quizzes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(data)
      })
      return handleResponse(response)
    },
    updateQuiz: async (id, data, token) => {
      const response = await fetch(`${API_URL}/quizzes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(data)
      })
      return handleResponse(response)
    },
    deleteQuiz: async (id, token) => {
      const response = await fetch(`${API_URL}/quizzes/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      return handleResponse(response)
    },
    reorderQuizzes: async (items, token) => {
      const response = await fetch(`${API_URL}/admin/quizzes/reorder`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ items })
      })
      return handleResponse(response)
    },

    // Questions
    createQuestion: async (quizId, data, token) => {
      const response = await fetch(`${API_URL}/quizzes/${quizId}/questions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ questions: [data] })
      })
      return handleResponse(response)
    },
    updateQuestion: async (id, data, token) => {
      const response = await fetch(`${API_URL}/quizzes/questions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(data)
      })
      return handleResponse(response)
    },
    deleteQuestion: async (id, token) => {
      const response = await fetch(`${API_URL}/quizzes/questions/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      return handleResponse(response)
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
      return handleResponse(response)
    },
    getMy: async (token) => {
      const response = await fetch(`${API_URL}/tickets/my`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      return handleResponse(response)
    },
    getById: async (ticketId, token) => {
      const response = await fetch(`${API_URL}/tickets/my/${ticketId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      return handleResponse(response)
    },
    // Admin
    getAll: async (token, filters = {}) => {
      const params = new URLSearchParams(filters).toString()
      const response = await fetch(`${API_URL}/tickets/all?${params}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      return handleResponse(response)
    },
    respond: async (ticketId, data, token) => {
      const response = await fetch(`${API_URL}/tickets/${ticketId}/respond`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(data)
      })
      return handleResponse(response)
    },
    updateStatus: async (ticketId, status, token) => {
      const response = await fetch(`${API_URL}/tickets/${ticketId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ status })
      })
      return handleResponse(response)
    },
    getStats: async (token) => {
      const response = await fetch(`${API_URL}/tickets/stats`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      return handleResponse(response)
    }
  }
}