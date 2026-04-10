export default function StudyPlanCard({ plan, onToggle, onRemove }) {
  return (
    <div
      className={`border rounded-lg p-4 transition ${
        plan.completed
          ? 'border-green-200 bg-green-50 dark:bg-green-900/20'
          : 'border-border bg-surface'
      }`}
    >
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={plan.completed}
          onChange={() => onToggle(plan.id)}
          className="mt-1 h-4 w-4 rounded accent-accent"
        />
        <div className="flex-1 min-w-0">
          <p
            className={`text-sm font-medium ${
              plan.completed ? 'line-through text-txt-secondary' : 'text-txt-primary'
            }`}
          >
            {plan.title}
          </p>
          {plan.subject && (
            <p className="text-xs text-txt-secondary mt-1">{plan.subject}</p>
          )}
          {plan.date && (
            <p className="text-xs text-txt-secondary mt-0.5">{plan.date}</p>
          )}
        </div>
        <button
          onClick={() => onRemove(plan.id)}
          className="text-red-400 hover:text-red-600 text-xs"
        >
          Remove
        </button>
      </div>
    </div>
  )
}
