import { create } from 'zustand'

const loadPlans = () => {
  try {
    return JSON.parse(localStorage.getItem('studyPlans') || '[]')
  } catch { return [] }
}

export const usePlannerStore = create((set, get) => ({
  plans: loadPlans(),

  addPlan: (plan) =>
    set((state) => {
      const newPlan = {
        id: `plan-${Date.now()}`,
        ...plan,
        createdAt: new Date().toISOString(),
        completed: false,
      }
      const next = [...state.plans, newPlan]
      localStorage.setItem('studyPlans', JSON.stringify(next))
      return { plans: next }
    }),

  togglePlan: (planId) =>
    set((state) => {
      const next = state.plans.map((p) =>
        p.id === planId ? { ...p, completed: !p.completed } : p
      )
      localStorage.setItem('studyPlans', JSON.stringify(next))
      return { plans: next }
    }),

  removePlan: (planId) =>
    set((state) => {
      const next = state.plans.filter((p) => p.id !== planId)
      localStorage.setItem('studyPlans', JSON.stringify(next))
      return { plans: next }
    }),

  getPlansForDate: (date) => {
    return get().plans.filter((p) => p.date === date)
  },

  clearCompleted: () =>
    set((state) => {
      const next = state.plans.filter((p) => !p.completed)
      localStorage.setItem('studyPlans', JSON.stringify(next))
      return { plans: next }
    }),

  clearAll: () => {
    localStorage.setItem('studyPlans', '[]')
    return set({ plans: [] })
  },
}))
