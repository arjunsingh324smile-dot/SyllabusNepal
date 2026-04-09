import { create } from 'zustand'

const loadPrefs = () => {
  try { return JSON.parse(localStorage.getItem('preferences') || '{}') } catch { return {} }
}

export const usePreferencesStore = create((set) => ({
  preferences: loadPrefs(),

  setPref: (key, value) =>
    set((state) => {
      const next = { ...state.preferences, [key]: value }
      localStorage.setItem('preferences', JSON.stringify(next))
      if (key === 'highContrast') document.documentElement.setAttribute('data-high-contrast', String(value))
      if (key === 'dyslexiaFont') document.documentElement.setAttribute('data-dyslexia-font', String(value))
      if (key === 'reduceMotion') document.documentElement.setAttribute('data-reduce-motion', String(value))
      return { preferences: next }
    }),

  getPref: (key, fallback = null) => {
    const prefs = loadPrefs()
    return prefs[key] ?? fallback
  },
}))
