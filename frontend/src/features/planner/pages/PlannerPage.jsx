import { useState } from 'react'
import { usePlannerStore } from '../store/plannerStore'
import StudyPlanCard from '../components/StudyPlanCard'
import PageWrapper from '../../../components/layout/PageWrapper'

export default function PlannerPage() {
  const { plans, addPlan, togglePlan, removePlan, clearCompleted } = usePlannerStore()
  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState('')
  const [date, setDate] = useState('')

  function handleAdd(e) {
    e.preventDefault()
    if (!title.trim()) return
    addPlan({ title: title.trim(), subject: subject.trim(), date })
    setTitle('')
    setSubject('')
    setDate('')
  }

  const pending = plans.filter((p) => !p.completed)
  const completed = plans.filter((p) => p.completed)

  return (
    <PageWrapper title="Study Planner" description="Plan and track your study schedule">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-txt-primary mb-6">Study Planner</h1>

        {/* Add Plan Form */}
        <form onSubmit={handleAdd} className="flex flex-col sm:flex-row gap-3 mb-8">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What do you want to study?"
            className="flex-1 rounded-md border border-border bg-page px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            required
          />
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject (optional)"
            className="sm:w-40 rounded-md border border-border bg-page px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="sm:w-40 rounded-md border border-border bg-page px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <button
            type="submit"
            className="px-6 py-2 rounded-md bg-accent text-white text-sm hover:bg-accent/90 transition"
          >
            Add
          </button>
        </form>

        {/* Pending */}
        {pending.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-txt-primary mb-3">
              Pending ({pending.length})
            </h2>
            <div className="space-y-2">
              {pending.map((plan) => (
                <StudyPlanCard
                  key={plan.id}
                  plan={plan}
                  onToggle={togglePlan}
                  onRemove={removePlan}
                />
              ))}
            </div>
          </div>
        )}

        {/* Completed */}
        {completed.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-txt-primary">
                Completed ({completed.length})
              </h2>
              <button
                onClick={clearCompleted}
                className="text-sm text-red-500 hover:text-red-700"
              >
                Clear Completed
              </button>
            </div>
            <div className="space-y-2">
              {completed.map((plan) => (
                <StudyPlanCard
                  key={plan.id}
                  plan={plan}
                  onToggle={togglePlan}
                  onRemove={removePlan}
                />
              ))}
            </div>
          </div>
        )}

        {plans.length === 0 && (
          <div className="text-center py-16 text-txt-secondary">
            <p className="text-lg">No study plans yet</p>
            <p className="text-sm mt-2">Add your first study task above.</p>
          </div>
        )}
      </div>
    </PageWrapper>
  )
}
