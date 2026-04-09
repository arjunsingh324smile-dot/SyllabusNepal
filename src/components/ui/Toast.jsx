import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, X } from 'lucide-react'

let toastId = 0
const listeners = new Set()
const toasts = []

export function showToast(message, type = 'success') {
  const toast = { id: ++toastId, message, type }
  toasts.push(toast)
  listeners.forEach((fn) => fn([...toasts]))
  setTimeout(() => {
    const idx = toasts.findIndex((t) => t.id === toast.id)
    if (idx > -1) toasts.splice(idx, 1)
    listeners.forEach((fn) => fn([...toasts]))
  }, 3000)
}

export default function Toast() {
  const [items, setItems] = useState([])

  useEffect(() => {
    listeners.add(setItems)
    return () => listeners.delete(setItems)
  }, [])

  return (
    <div className="fixed top-20 right-4 z-[90] space-y-2 no-print" aria-live="polite">
      <AnimatePresence>
        {items.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="flex items-center gap-2 px-4 py-3 bg-card rounded-xl border border-border-light shadow-lg"
          >
            {toast.type === 'success' ? (
              <CheckCircle size={16} className="text-green-500" />
            ) : (
              <XCircle size={16} className="text-red-500" />
            )}
            <span className="text-sm text-txt-primary">{toast.message}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
