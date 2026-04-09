import { Link } from 'react-router-dom'

export default function Sidebar({ chapters = [], activeChapterId, basePath, color }) {
  return (
    <aside
      className="hidden lg:block w-56 sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto pr-4 border-r border-border-light"
      role="navigation"
      aria-label="Chapter navigator"
    >
      <h3 className="text-xs font-semibold text-txt-muted uppercase tracking-wider mb-3 px-2">
        Chapters
      </h3>
      <ul className="space-y-0.5">
        {chapters.map((ch) => (
          <li key={ch.id}>
            <Link
              to={`${basePath}/${ch.id}`}
              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                ch.id === activeChapterId
                  ? 'font-semibold bg-hovr'
                  : 'text-txt-secondary hover:text-txt-primary hover:bg-hovr'
              }`}
              style={ch.id === activeChapterId ? { color, borderLeft: `3px solid ${color}` } : {}}
            >
              <span className="text-txt-muted text-xs mr-1.5">{ch.number}.</span>
              {ch.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}
