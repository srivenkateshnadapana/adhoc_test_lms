import { api } from './api'
import { getToken } from './storage'

export const CourseService = {
  getAll: () => api.courses.getAll(),
  getById: (id) => api.courses.getById(id, getToken()),
  getMyCourses: () => api.courses.getMyCourses(getToken())
}
