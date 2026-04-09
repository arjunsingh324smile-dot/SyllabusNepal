import api from './api.js'

export const syllabusApi = {
  // Programs
  getPrograms: (params) => api.get('/programs', { params }),
  getProgramById: (id) => api.get(`/programs/${id}`),
  getProgramsByCategory: (category) => api.get(`/programs/category/${category}`),

  // Subjects
  getSubjects: (params) => api.get('/subjects', { params }),
  getSubjectById: (id) => api.get(`/subjects/${id}`),
  getSubjectsByProgram: (programId) => api.get(`/subjects/program/${programId}`),

  // Chapters
  getChapters: (params) => api.get('/chapters', { params }),
  getChapterById: (id) => api.get(`/chapters/${id}`),
  getChaptersBySubject: (subjectId) => api.get(`/chapters/subject/${subjectId}`),

  // Topics
  getTopics: (params) => api.get('/topics', { params }),
  getTopicById: (id) => api.get(`/topics/${id}`),
  getTopicsByChapter: (chapterId) => api.get(`/topics/chapter/${chapterId}`),
}
