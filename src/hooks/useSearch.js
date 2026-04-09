import { useState, useMemo, useCallback } from 'react'
import Fuse from 'fuse.js'

export function useSearch(data, options = {}) {
  const [query, setQuery] = useState('')

  const fuse = useMemo(
    () =>
      new Fuse(data, {
        keys: options.keys || ['name', 'program', 'subject', 'chapter'],
        threshold: options.threshold || 0.3,
        includeScore: true,
        includeMatches: true,
        minMatchCharLength: 2,
        ...options,
      }),
    [data, options]
  )

  const results = useMemo(() => {
    if (!query || query.length < 2) return []
    return fuse.search(query).slice(0, 20)
  }, [fuse, query])

  const search = useCallback((q) => setQuery(q), [])

  return { query, search, results, setQuery }
}
