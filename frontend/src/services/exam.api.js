import api from './api.js'

export const entranceApi = {
  getAll: () => api.get('/entrance'),
  getById: (id) => api.get(`/entrance/${id}`),
}

export const competitiveApi = {
  getAll: () => api.get('/competitive'),
  getById: (id) => api.get(`/competitive/${id}`),
}
