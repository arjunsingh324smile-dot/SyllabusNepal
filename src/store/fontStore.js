import { create } from 'zustand'

const getFontSize = () => {
  try { return localStorage.getItem('fontSize') || 'medium' } catch { return 'medium' }
}

export const useFontStore = create((set) => ({
  fontSize: getFontSize(),
  setFontSize: (size) => {
    localStorage.setItem('fontSize', size)
    document.documentElement.setAttribute('data-font-size', size)
    set({ fontSize: size })
  },
  cycleFontSize: () =>
    set((state) => {
      const order = ['small', 'medium', 'large']
      const idx = order.indexOf(state.fontSize)
      const next = order[(idx + 1) % 3]
      localStorage.setItem('fontSize', next)
      document.documentElement.setAttribute('data-font-size', next)
      return { fontSize: next }
    }),
}))
