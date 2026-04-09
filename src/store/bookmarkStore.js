import { create } from 'zustand'

const loadBookmarks = () => {
  try {
    return JSON.parse(localStorage.getItem('bookmarks') || '[]')
  } catch { return [] }
}

export const useBookmarkStore = create((set, get) => ({
  bookmarks: loadBookmarks(),

  addBookmark: (item) =>
    set((state) => {
      if (state.bookmarks.some((b) => b.id === item.id)) return state
      const next = [...state.bookmarks, { ...item, savedAt: new Date().toISOString() }]
      localStorage.setItem('bookmarks', JSON.stringify(next))
      return { bookmarks: next }
    }),

  removeBookmark: (id) =>
    set((state) => {
      const next = state.bookmarks.filter((b) => b.id !== id)
      localStorage.setItem('bookmarks', JSON.stringify(next))
      return { bookmarks: next }
    }),

  isBookmarked: (id) => get().bookmarks.some((b) => b.id === id),

  clearByProgram: (program) =>
    set((state) => {
      const next = state.bookmarks.filter((b) => b.program !== program)
      localStorage.setItem('bookmarks', JSON.stringify(next))
      return { bookmarks: next }
    }),

  clearAll: () => {
    localStorage.setItem('bookmarks', '[]')
    return set({ bookmarks: [] })
  },
}))
