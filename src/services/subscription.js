import { api } from './api'
import { getToken } from './storage'

export const SubscriptionService = {
  purchase: (courseId, plan) => api.enrollments.purchase(courseId, plan, getToken()),
  checkAccess: (courseId) => api.enrollments.checkAccess(courseId, getToken())
}
