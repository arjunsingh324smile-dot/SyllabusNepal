import { Link } from 'react-router-dom'
import { useRecentStore } from '../../store/recentStore'
import { Clock, X, ArrowRight } from 'lucide-react'
import { formatDate } from '../../utils/formatters'

export default function RecentlyViewed() {
  const { items, removeRecent } = useRecentStore()

  if (items.length === 0) return null

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-xl font-semibold text-txt-primary flex items-center gap-2">
          <Clock size={20} className="text-txt-muted" />
          Continue Studying
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.slice(0, 6).map((item) => (
          <div
            key={item.path}
            className="flex items-center gap-3 p-3 bg-card rounded-xl border border-border-light hover:shadow-sm transition-shadow group"
          >
            <Link to={item.path} className="flex-1 min-w-0">
              <div className="font-medium text-sm text-txt-primary truncate group-hover:text-accent-blue transition-colors">
                {item.name}
              </div>
              <div className="text-xs text-txt-muted truncate">{item.breadcrumb}</div>
              <div className="text-xs text-txt-disabled mt-0.5">{formatDate(item.visitedAt)}</div>
            </Link>
            <button
              onClick={() => removeRecent(item.path)}
              className="p-1 rounded hover:bg-hovr text-txt-muted opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Remove from recent"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}
