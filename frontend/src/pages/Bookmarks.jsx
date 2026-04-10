import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Bookmark, Trash2 } from 'lucide-react'
import PageWrapper from '../components/layout/PageWrapper'
import Breadcrumb from '../components/layout/Breadcrumb'
import { useBookmarkStore } from '../store/bookmarkStore'

export default function Bookmarks() {
  const { bookmarks, removeBookmark, clearBookmarks } = useBookmarkStore()

  return (
    <PageWrapper>
      <Helmet>
        <title>Bookmarks | SyllabusNepal</title>
      </Helmet>

      <Breadcrumb items={[{ label: 'Bookmarks', color: '#F59E0B' }]} />

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display text-2xl font-bold text-txt-primary flex items-center gap-2">
            <Bookmark size={24} className="text-amber-500" />
            Bookmarks ({bookmarks.length})
          </h1>
          {bookmarks.length > 0 && (
            <button
              onClick={clearBookmarks}
              className="text-sm text-red-500 hover:text-red-700 flex items-center gap-1 transition-colors"
            >
              <Trash2 size={14} /> Clear All
            </button>
          )}
        </div>

        {bookmarks.length > 0 ? (
          <div className="space-y-3">
            {bookmarks.map((item) => (
              <div
                key={item.id}
                className="bg-card rounded-xl border border-border-light p-4 flex items-center gap-4"
              >
                <div className="flex-1 min-w-0">
                  <Link
                    to={item.path || '#'}
                    className="font-semibold text-txt-primary hover:text-accent transition-colors"
                  >
                    {item.name || item.title}
                  </Link>
                  {item.breadcrumb && (
                    <p className="text-sm text-txt-muted mt-0.5">{item.breadcrumb}</p>
                  )}
                </div>
                <button
                  onClick={() => removeBookmark(item.id)}
                  className="p-2 text-txt-muted hover:text-red-500 transition-colors shrink-0"
                  aria-label="Remove bookmark"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-txt-muted">
            <Bookmark size={48} className="mx-auto mb-4 opacity-30" />
            <p className="text-lg">No bookmarks yet</p>
            <p className="text-sm mt-1">Click the bookmark icon on any topic to save it here.</p>
          </div>
        )}
      </div>
    </PageWrapper>
  )
}
