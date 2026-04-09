import { useState, useEffect } from 'react'
import { syllabusApi } from '../../../services/syllabus.api.js'

// Hook to fetch programs with optional category filter
export function usePrograms(category) {
  const [programs, setPrograms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)

    const fetch = category
      ? syllabusApi.getProgramsByCategory(category)
      : syllabusApi.getPrograms()

    fetch
      .then((res) => {
        if (!cancelled) setPrograms(res.data || [])
      })
      .catch((err) => {
        if (!cancelled) setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => { cancelled = true }
  }, [category])

  return { programs, loading, error }
}

// Hook to fetch a single program by ID
export function useProgram(programId) {
  const [program, setProgram] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!programId) return
    let cancelled = false
    setLoading(true)

    syllabusApi.getProgramById(programId)
      .then((res) => {
        if (!cancelled) setProgram(res.data)
      })
      .catch((err) => {
        if (!cancelled) setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => { cancelled = true }
  }, [programId])

  return { program, loading, error }
}
