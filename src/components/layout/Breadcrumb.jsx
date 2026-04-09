import { Link, useLocation } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'

export default function Breadcrumb({ items = [] }) {
  const location = useLocation()

  if (location.pathname === '/') return null

  return (
    <nav aria-label="Breadcrumb" className="breadcrumb py-3 px-4 md:px-8">
      <ol className="flex items-center gap-1 text-sm flex-wrap">
        <li>
          <Link
            to="/"
            className="flex items-center gap-1 text-txt-muted hover:text-txt-primary transition-colors"
            aria-label="Home"
          >
            <Home size={14} />
            <span className="hidden md:inline">Home</span>
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1">
            <ChevronRight size={14} className="text-txt-disabled" />
            {i === items.length - 1 ? (
              <span
                className="font-medium"
                style={{ color: item.color || 'var(--text-primary)' }}
                aria-current="page"
              >
                {item.label}
              </span>
            ) : (
              <Link
                to={item.path}
                className="text-txt-muted hover:text-txt-primary transition-colors"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
