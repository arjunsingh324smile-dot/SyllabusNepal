import { useState, useEffect, useRef, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, ArrowRight, Clock } from 'lucide-react'
import Fuse from 'fuse.js'
import { getSearchItems } from '../../utils/searchIndex'
import ProgramBadge from './ProgramBadge'

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [recentSearches, setRecentSearches] = useState(() => {
    try { return JSON.parse(localStorage.getItem('recentSearches') || '[]') } catch { return [] }
  })
  const inputRef = useRef(null)
  const navigate = useNavigate()

  const fuse = useMemo(() => {
    const items = getSearchItems()
    return new Fuse(items, {
      keys: [
        { name: 'name', weight: 0.5 },
        { name: 'program', weight: 0.3 },
        { name: 'category', weight: 0.2 },
      ],
      threshold: 0.35,
      includeScore: true,
      includeMatches: true,
    })
  }, [])

  const results = useMemo(() => {
    if (!query || query.length < 2) return []
    return fuse.search(query).slice(0, 15)
  }, [fuse, query])

  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setSelectedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  const handleSelect = (item) => {
    const searches = [query, ...recentSearches.filter(s => s !== query)].slice(0, 10)
    setRecentSearches(searches)
    localStorage.setItem('recentSearches', JSON.stringify(searches))
    navigate(item.path)
    onClose()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((i) => Math.min(i + 1, results.length - 1))
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((i) => Math.max(i - 1, 0))
    }
    if (e.key === 'Enter' && results[selectedIndex]) {
      handleSelect(results[selectedIndex].item)
    }
    if (e.key === 'Escape') onClose()
  }

  const popularSearches = ['IOE Physics', 'SEE Mathematics', 'CEE MBBS', 'CSIT Entrance', 'Loksewa']

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]"
        role="dialog"
        aria-modal="true"
        aria-label="Search"
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

        {/* Modal */}
        <motion.div
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.96, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl mx-4 bg-card rounded-2xl border border-border-light shadow-lg overflow-hidden"
        >
          {/* Search input */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-border-light">
            <Search size={20} className="text-txt-muted flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0) }}
              onKeyDown={handleKeyDown}
              placeholder="Search programs, subjects, chapters, topics..."
              className="flex-1 bg-transparent text-txt-primary text-base outline-none placeholder:text-txt-muted"
              aria-label="Search"
            />
            <button
              onClick={onClose}
              className="p-1 rounded-md hover:bg-hovr text-txt-muted"
              aria-label="Close search"
            >
              <X size={18} />
            </button>
          </div>

          {/* Results */}
          <div className="max-h-[50vh] overflow-y-auto p-2">
            {query.length < 2 ? (
              <div className="p-4">
                {/* Recent searches */}
                {recentSearches.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-xs font-semibold text-txt-muted uppercase tracking-wider mb-2 px-2">
                      Recent
                    </h4>
                    {recentSearches.slice(0, 5).map((s, i) => (
                      <button
                        key={i}
                        onClick={() => setQuery(s)}
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-txt-secondary hover:bg-hovr rounded-lg"
                      >
                        <Clock size={14} className="text-txt-muted" />
                        {s}
                      </button>
                    ))}
                  </div>
                )}
                {/* Popular */}
                <div>
                  <h4 className="text-xs font-semibold text-txt-muted uppercase tracking-wider mb-2 px-2">
                    Popular Searches
                  </h4>
                  <div className="flex flex-wrap gap-2 px-2">
                    {popularSearches.map((s) => (
                      <button
                        key={s}
                        onClick={() => setQuery(s)}
                        className="text-xs px-3 py-1.5 rounded-full bg-surface text-txt-secondary hover:bg-hovr border border-border-light transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : results.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-txt-muted text-sm">No results found for "{query}"</p>
                <p className="text-txt-disabled text-xs mt-1">
                  Try different keywords or check the spelling
                </p>
              </div>
            ) : (
              results.map((result, i) => (
                <button
                  key={result.item.path + i}
                  onClick={() => handleSelect(result.item)}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-left transition-colors ${
                    i === selectedIndex ? 'bg-hovr' : 'hover:bg-hovr'
                  }`}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold"
                    style={{ backgroundColor: `${result.item.color}12`, color: result.item.color }}
                  >
                    {result.item.type === 'program' ? 'P' : 'S'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm text-txt-primary truncate">
                      {result.item.name}
                    </div>
                    <div className="text-xs text-txt-muted truncate">
                      {result.item.category} → {result.item.program}
                    </div>
                  </div>
                  <ArrowRight size={14} className="text-txt-muted flex-shrink-0" />
                </button>
              ))
            )}
          </div>

          {/* Footer hint */}
          <div className="px-5 py-3 border-t border-border-light flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs text-txt-muted">
              <span>↑↓ Navigate</span>
              <span>↩ Select</span>
              <span>Esc Close</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
