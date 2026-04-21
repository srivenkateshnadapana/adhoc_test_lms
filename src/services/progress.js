import { api } from './api'
import { getToken } from './storage'

export const ProgressService = {
  getCourseProgress: (courseId) => api.progress.getCourseProgress(courseId, getToken()),
  markLessonComplete: (lessonId) => api.progress.markComplete(lessonId, getToken())
}
