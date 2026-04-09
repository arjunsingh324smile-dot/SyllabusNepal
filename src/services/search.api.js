import api from './api.js'

export const searchApi = {
  search: (query, limit = 20) => api.get('/search', { params: { q: query, limit } }),
}
