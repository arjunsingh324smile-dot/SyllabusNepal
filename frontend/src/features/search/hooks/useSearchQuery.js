import { useState, useCallback } from 'react'
import { searchApi } from '../../../services/search.api.js'

export function useSearchQuery() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const search = useCallback(async (query) => {
    if (!query || query.length < 2) {
      setResults([])
      return
    }

    setLoading(true)
    setError(null)

    try {
      const res = await searchApi.search(query)
      setResults(res.data || [])
    } catch (err) {
      setError(err.message)
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [])

  const clear = useCallback(() => {
    setResults([])
    setError(null)
  }, [])

  return { results, loading, error, search, clear }
}
