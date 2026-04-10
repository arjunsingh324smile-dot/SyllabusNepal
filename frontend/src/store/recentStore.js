import { create } from 'zustand'

const loadRecent = () => {
  try { return JSON.parse(localStorage.getItem('recentViewed') || '[]') } catch { return [] }
}

export const useRecentStore = create((set) => ({
  items: loadRecent(),

  addRecent: (item) =>
    set((state) => {
      const filtered = state.items.filter((i) => i.path !== item.path)
      const next = [{ ...item, visitedAt: new Date().toISOString() }, ...filtered].slice(0, 10)
      localStorage.setItem('recentViewed', JSON.stringify(next))
      return { items: next }
    }),

  removeRecent: (path) =>
    set((state) => {
      const next = state.items.filter((i) => i.path !== path)
      localStorage.setItem('recentViewed', JSON.stringify(next))
      return { items: next }
    }),

  clearAll: () => {
    localStorage.setItem('recentViewed', '[]')
    return set({ items: [] })
  },
}))
