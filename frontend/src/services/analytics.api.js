import api from './api.js'

export const analyticsApi = {
  track: (event, data) => api.post('/analytics/track', { event, ...data }),
  getPopular: (type, limit) => api.get('/analytics/popular', { params: { type, limit } }),
  getStats: () => api.get('/analytics/stats'),
}
