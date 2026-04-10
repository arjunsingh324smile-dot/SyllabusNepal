import { useState, useEffect } from 'react'
import { syllabusApi } from '../../../services/syllabus.api.js'

export function useTopics(chapterId) {
  const [topics, setTopics] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!chapterId) return
    let cancelled = false
    setLoading(true)

    syllabusApi.getTopicsByChapter(chapterId)
      .then((res) => {
        if (!cancelled) setTopics(res.data || [])
      })
      .catch((err) => {
        if (!cancelled) setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => { cancelled = true }
  }, [chapterId])

  return { topics, loading, error }
}

export function useTopic(topicId) {
  const [topic, setTopic] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!topicId) return
    let cancelled = false
    setLoading(true)

    syllabusApi.getTopicById(topicId)
      .then((res) => {
        if (!cancelled) setTopic(res.data)
      })
      .catch((err) => {
        if (!cancelled) setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => { cancelled = true }
  }, [topicId])

  return { topic, loading, error }
}
