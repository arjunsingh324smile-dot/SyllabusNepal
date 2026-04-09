import { create } from 'zustand'

const loadNotes = () => {
  try {
    return JSON.parse(localStorage.getItem('studyNotes') || '{}')
  } catch { return {} }
}

export const useNotesStore = create((set, get) => ({
  notes: loadNotes(),

  addNote: (topicId, content) =>
    set((state) => {
      const next = {
        ...state.notes,
        [topicId]: {
          content,
          updatedAt: new Date().toISOString(),
        },
      }
      localStorage.setItem('studyNotes', JSON.stringify(next))
      return { notes: next }
    }),

  removeNote: (topicId) =>
    set((state) => {
      const next = { ...state.notes }
      delete next[topicId]
      localStorage.setItem('studyNotes', JSON.stringify(next))
      return { notes: next }
    }),

  getNote: (topicId) => get().notes[topicId] || null,

  getAllNotes: () => {
    const notes = get().notes
    return Object.entries(notes).map(([topicId, data]) => ({
      topicId,
      ...data,
    }))
  },

  clearAll: () => {
    localStorage.setItem('studyNotes', '{}')
    return set({ notes: {} })
  },
}))
