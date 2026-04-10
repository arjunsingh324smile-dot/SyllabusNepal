import { useState, useEffect } from 'react'
import { syllabusApi } from '../../../services/syllabus.api.js'

export function useChapters(subjectId) {
  const [chapters, setChapters] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!subjectId) return
    let cancelled = false
    setLoading(true)

    syllabusApi.getChaptersBySubject(subjectId)
      .then((res) => {
        if (!cancelled) setChapters(res.data || [])
      })
      .catch((err) => {
        if (!cancelled) setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => { cancelled = true }
  }, [subjectId])

  return { chapters, loading, error }
}

export function useChapter(chapterId) {
  const [chapter, setChapter] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!chapterId) return
    let cancelled = false
    setLoading(true)

    syllabusApi.getChapterById(chapterId)
      .then((res) => {
        if (!cancelled) setChapter(res.data)
      })
      .catch((err) => {
        if (!cancelled) setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => { cancelled = true }
  }, [chapterId])

  return { chapter, loading, error }
}
