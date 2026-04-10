import { motion } from 'framer-motion'
import { Bookmark, BookmarkCheck } from 'lucide-react'
import { useBookmarkStore } from '../../store/bookmarkStore'

export default function BookmarkButton({ item, color = '#2563EB' }) {
  const { bookmarks, addBookmark, removeBookmark } = useBookmarkStore()
  const isBookmarked = bookmarks.some((b) => b.id === item?.id)

  const toggle = () => {
    if (!item) return
    if (isBookmarked) removeBookmark(item.id)
    else addBookmark(item)
  }

  return (
    <motion.button
      onClick={toggle}
      whileTap={{ scale: 1.3 }}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
        isBookmarked
          ? 'bg-yellow-50 text-yellow-600 border border-yellow-200'
          : 'bg-surface text-txt-muted hover:text-txt-primary border border-border-light'
      }`}
      aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
      aria-pressed={isBookmarked}
    >
      {isBookmarked ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
      {isBookmarked ? 'Saved' : 'Bookmark'}
    </motion.button>
  )
}
