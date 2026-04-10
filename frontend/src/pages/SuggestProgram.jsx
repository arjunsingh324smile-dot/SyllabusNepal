import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { Send, Lightbulb } from 'lucide-react'
import PageWrapper from '../components/layout/PageWrapper'
import Breadcrumb from '../components/layout/Breadcrumb'

export default function SuggestProgram() {
  const [form, setForm] = useState({ name: '', category: '', details: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Program Suggestion: ${form.name}`)
    const body = encodeURIComponent(`Category: ${form.category}\nProgram: ${form.name}\n\nDetails:\n${form.details}`)
    window.location.href = `mailto:contact@syllabusnepal.com?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  return (
    <PageWrapper>
      <Helmet>
        <title>Suggest a Program | SyllabusNepal</title>
      </Helmet>

      <Breadcrumb items={[{ label: 'Suggest Program', color: '#F59E0B' }]} />

      <div className="max-w-2xl mx-auto px-4 md:px-8 py-8">
        <h1 className="font-display text-2xl font-bold text-txt-primary mb-2 flex items-center gap-2">
          <Lightbulb size={24} className="text-amber-500" />
          Suggest a Program
        </h1>
        <p className="text-txt-muted mb-8">
          Can&apos;t find a program or syllabus? Let us know and we&apos;ll add it.
        </p>

        {submitted ? (
          <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-6 text-center">
            <p className="text-emerald-700 dark:text-emerald-400 font-semibold text-lg mb-1">
              Thank you!
            </p>
            <p className="text-sm text-txt-muted">
              Your suggestion has been prepared. Complete sending in your email client.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-txt-primary mb-1">
                Program Name *
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="e.g., BBS 4th Year"
                className="w-full px-4 py-3 rounded-xl border border-border-light bg-card text-txt-primary focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-txt-primary mb-1">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border border-border-light bg-card text-txt-primary focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="">Select category</option>
                <option value="school">School (SEE/NEB)</option>
                <option value="entrance">Entrance Exams</option>
                <option value="bachelor">Bachelor Programs</option>
                <option value="competitive">Competitive Exams</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-txt-primary mb-1">Details</label>
              <textarea
                rows={4}
                value={form.details}
                onChange={(e) => setForm((f) => ({ ...f, details: e.target.value }))}
                placeholder="Any additional information..."
                className="w-full px-4 py-3 rounded-xl border border-border-light bg-card text-txt-primary focus:outline-none focus:ring-2 focus:ring-accent resize-none"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-white font-medium hover:bg-accent/90 transition-colors"
            >
              <Send size={16} /> Send Suggestion
            </button>
          </form>
        )}
      </div>
    </PageWrapper>
  )
}
