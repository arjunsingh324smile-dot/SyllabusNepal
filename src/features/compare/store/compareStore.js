import { create } from 'zustand'

export const useCompareStore = create((set, get) => ({
  items: [],

  addToCompare: (item) =>
    set((state) => {
      if (state.items.length >= 4) return state
      if (state.items.some((i) => i.id === item.id)) return state
      return { items: [...state.items, item] }
    }),

  removeFromCompare: (id) =>
    set((state) => ({
      items: state.items.filter((i) => i.id !== id),
    })),

  clearCompare: () => set({ items: [] }),

  isInCompare: (id) => get().items.some((i) => i.id === id),
}))
