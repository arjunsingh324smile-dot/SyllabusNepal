import { useProgressStore } from '../store/progressStore'

export function useProgress(topicIds = []) {
  const { readTopics, markRead, markUnread } = useProgressStore()
  const readCount = topicIds.filter((id) => readTopics[id]).length
  const total = topicIds.length
  const percent = total ? Math.round((readCount / total) * 100) : 0

  const toggle = (topicId) => {
    if (readTopics[topicId]) markUnread(topicId)
    else markRead(topicId)
  }

  return { readCount, total, percent, toggle, isRead: (id) => !!readTopics[id] }
}
