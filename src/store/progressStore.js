import { create } from 'zustand'

const loadProgress = () => {
  try {
    return JSON.parse(localStorage.getItem('readTopics') || '{}')
  } catch { return {} }
}

export const useProgressStore = create((set, get) => ({
  readTopics: loadProgress(),

  markRead: (topicId) =>
    set((state) => {
      const next = { ...state.readTopics, [topicId]: true }
      localStorage.setItem('readTopics', JSON.stringify(next))
      return { readTopics: next }
    }),

  markUnread: (topicId) =>
    set((state) => {
      const next = { ...state.readTopics }
      delete next[topicId]
      localStorage.setItem('readTopics', JSON.stringify(next))
      return { readTopics: next }
    }),

  isRead: (topicId) => !!get().readTopics[topicId],

  getProgress: (topicIds) => {
    const read = get().readTopics
    const readCount = topicIds.filter((id) => read[id]).length
    return { read: readCount, total: topicIds.length, percent: topicIds.length ? Math.round((readCount / topicIds.length) * 100) : 0 }
  },

  resetSubject: (prefix) =>
    set((state) => {
      const next = {}
      Object.entries(state.readTopics).forEach(([k, v]) => {
        if (!k.startsWith(prefix)) next[k] = v
      })
      localStorage.setItem('readTopics', JSON.stringify(next))
      return { readTopics: next }
    }),

  resetAll: () => {
    localStorage.setItem('readTopics', '{}')
    return set({ readTopics: {} })
  },
}))
