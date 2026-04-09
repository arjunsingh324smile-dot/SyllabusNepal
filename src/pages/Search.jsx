import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Search as SearchIcon, X, Clock, TrendingUp } from 'lucide-react'
import { useState } from 'react'
import PageWrapper from '../components/layout/PageWrapper'
import { useSearch } from '../hooks/useSearch'

export default function Search() {
  const [query, setQuery] = useState('')
  const results = useSearch(query)

  return (
    <PageWrapper>
      <Helmet>
        <title>Search Syllabus | SyllabusNepal</title>
      </Helmet>

      <div className="max-w-3xl mx-auto px-4 md:px-8 py-12">
        <h1 className="font-display text-3xl font-bold text-txt-primary mb-6 text-center">
          Search Syllabus
        </h1>

        <div className="relative mb-8">
          <SearchIcon size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-txt-muted" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search subjects, chapters, programs..."
            className="w-full pl-12 pr-10 py-4 rounded-xl border border-border-light bg-card text-txt-primary text-lg focus:outline-none focus:ring-2 focus:ring-accent"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-txt-muted hover:text-txt-primary"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {query.length > 0 && (
          <div>
            <p className="text-sm text-txt-muted mb-4">
              {results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
            </p>
            <div className="space-y-3">
              {results.map((item) => (
                <Link
                  key={item.path || item.id}
                  to={item.path || '#'}
                  className="block bg-card rounded-xl border border-border-light p-4 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-2 mb-1">
                    {item.programBadge && (
                      <span className="text-xs px-2 py-0.5 rounded bg-surface text-txt-muted">
                        {item.programBadge}
                      </span>
                    )}
                    <span className="text-xs text-txt-muted">{item.category}</span>
                  </div>
                  <h3 className="font-semibold text-txt-primary">{item.name}</h3>
                  {item.description && (
                    <p className="text-sm text-txt-muted mt-1 line-clamp-2">{item.description}</p>
                  )}
                </Link>
              ))}
            </div>

            {results.length === 0 && (
              <div className="text-center py-12 text-txt-muted">
                <SearchIcon size={48} className="mx-auto mb-4 opacity-30" />
                <p className="text-lg">No results found</p>
                <p className="text-sm mt-1">Try a different search term</p>
              </div>
            )}
          </div>
        )}

        {query.length === 0 && (
          <div className="text-center py-8 text-txt-muted">
            <p className="text-sm">Start typing to search across all programs, subjects, and chapters</p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {['IOE Physics', 'SEE Mathematics', 'BCA', 'Loksewa'].map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-3 py-1.5 rounded-full bg-surface border border-border-light text-sm text-txt-secondary hover:bg-hovr transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  )
}
