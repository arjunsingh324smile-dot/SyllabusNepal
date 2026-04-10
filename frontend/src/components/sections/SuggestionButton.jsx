import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquarePlus, X, Send, CheckCircle } from 'lucide-react'

export default function SuggestionButton() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-24 lg:bottom-8 left-4 z-40 flex items-center gap-2 px-4 py-2.5 bg-accent-purple text-white text-sm font-medium rounded-full shadow-lg hover:bg-purple-700 transition-colors no-print suggestion-btn"
        aria-label="Suggest an update"
      >
        <MessageSquarePlus size={16} />
        <span className="hidden md:inline">Suggest</span>
      </button>
      <AnimatePresence>
        {open && <SuggestionModal onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  )
}

function SuggestionModal({ onClose }) {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ program: '', subject: '', type: 'Missing Topic', desc: '', email: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`SyllabusNepal Suggestion: ${form.type}`)
    const body = encodeURIComponent(
      `Program: ${form.program}\nSubject: ${form.subject}\nType: ${form.type}\n\n${form.desc}\n\nFrom: ${form.email || 'Anonymous'}`
    )
    window.location.href = `mailto:suggestions@syllabusnepal.com?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Suggest an update"
    >
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative bg-card rounded-2xl border border-border-light shadow-lg w-full max-w-md p-6"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-md hover:bg-hovr text-txt-muted"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
            <h3 className="font-display text-lg font-semibold text-txt-primary mb-2">
              Thank you!
            </h3>
            <p className="text-sm text-txt-muted">We review all suggestions carefully.</p>
          </div>
        ) : (
          <>
            <h3 className="font-display text-lg font-semibold text-txt-primary mb-4">
              Suggest an Update
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <select
                value={form.program}
                onChange={(e) => setForm({ ...form, program: e.target.value })}
                className="w-full px-3 py-2 bg-surface border border-border-light rounded-lg text-sm text-txt-primary"
                required
              >
                <option value="">Select Program</option>
                <option>SEE</option>
                <option>NEB Grade 11</option>
                <option>NEB Grade 12</option>
                <option>IOE Entrance</option>
                <option>CEE Medical</option>
                <option>CSIT Entrance</option>
                <option>BCA</option>
                <option>BBS</option>
                <option>Loksewa</option>
                <option>Other</option>
              </select>
              <input
                type="text"
                placeholder="Subject / Chapter / Topic name"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full px-3 py-2 bg-surface border border-border-light rounded-lg text-sm text-txt-primary placeholder:text-txt-muted"
              />
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full px-3 py-2 bg-surface border border-border-light rounded-lg text-sm text-txt-primary"
              >
                <option>Missing Topic</option>
                <option>Wrong Information</option>
                <option>Outdated Content</option>
                <option>New Program Request</option>
              </select>
              <textarea
                placeholder="Describe the suggestion..."
                value={form.desc}
                onChange={(e) => setForm({ ...form, desc: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 bg-surface border border-border-light rounded-lg text-sm text-txt-primary placeholder:text-txt-muted resize-none"
                required
              />
              <input
                type="email"
                placeholder="Your email (optional)"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-3 py-2 bg-surface border border-border-light rounded-lg text-sm text-txt-primary placeholder:text-txt-muted"
              />
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-accent-purple text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
              >
                <Send size={16} /> Submit Suggestion
              </button>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  )
}
