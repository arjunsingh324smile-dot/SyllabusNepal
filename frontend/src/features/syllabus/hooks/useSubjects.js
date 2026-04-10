import { useState, useEffect } from 'react'
import { syllabusApi } from '../../../services/syllabus.api.js'

export function useSubjects(programId) {
  const [subjects, setSubjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!programId) return
    let cancelled = false
    setLoading(true)

    syllabusApi.getSubjectsByProgram(programId)
      .then((res) => {
        if (!cancelled) setSubjects(res.data || [])
      })
      .catch((err) => {
        if (!cancelled) setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => { cancelled = true }
  }, [programId])

  return { subjects, loading, error }
}

export function useSubject(subjectId) {
  const [subject, setSubject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!subjectId) return
    let cancelled = false
    setLoading(true)

    syllabusApi.getSubjectById(subjectId)
      .then((res) => {
        if (!cancelled) setSubject(res.data)
      })
      .catch((err) => {
        if (!cancelled) setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => { cancelled = true }
  }, [subjectId])

  return { subject, loading, error }
}
