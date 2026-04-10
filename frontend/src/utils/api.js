const BASE = import.meta.env.VITE_API_URL || '/api'

const get = (url) =>
  fetch(`${BASE}${url}`).then(r => {
    if (!r.ok) throw new Error(`API error: ${r.status}`)
    return r.json()
  })

export const api = {
  // Programs index
  getPrograms: () =>
    get('/meta/programs'),

  // Generic subject list for any program
  // category = school|bachelor|engineering|entrance|competitive
  // programPath = see | neb-grade-11/science | bca/sem-1 | etc.
  getSubjects: (category, programPath) =>
    get(`/${category}/${programPath}/subjects`),

  // Full subject data (all chapters list)
  getSubject: (category, programPath, subjectId) =>
    get(`/${category}/${programPath}/${subjectId}`),

  // Single chapter with full intro + topics
  getChapter: (category, programPath, subjectId, chapterId) =>
    get(`/${category}/${programPath}/${subjectId}/${chapterId}`),
}
