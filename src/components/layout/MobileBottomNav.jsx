import { Link, useLocation } from 'react-router-dom'
import { Home, BookOpen, Search, Bookmark, Settings } from 'lucide-react'

const tabs = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: BookOpen, label: 'Programs', path: '/programs' },
  { icon: Search, label: 'Search', path: '/search' },
  { icon: Bookmark, label: 'Bookmarks', path: '/bookmarks' },
  { icon: Settings, label: 'Settings', path: '/about' },
]

export default function MobileBottomNav() {
  const location = useLocation()

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border-light lg:hidden mobile-bottom-nav"
      role="navigation"
      aria-label="Mobile navigation"
    >
      <div className="flex items-center justify-around h-16 px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const active = tab.path === '/'
            ? location.pathname === '/'
            : location.pathname.startsWith(tab.path)
          return (
            <Link
              key={tab.path}
              to={tab.path}
              className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg transition-colors min-w-[56px] ${
                active ? 'text-accent-blue' : 'text-txt-muted'
              }`}
              aria-label={tab.label}
              aria-current={active ? 'page' : undefined}
            >
              <Icon size={20} strokeWidth={active ? 2.5 : 1.5} />
              {active && (
                <span className="text-[10px] font-semibold">{tab.label}</span>
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
