import { useBookmarkStore } from '../store/bookmarkStore'

export function useBookmark(item) {
  const { bookmarks, addBookmark, removeBookmark } = useBookmarkStore()
  const isBookmarked = bookmarks.some((b) => b.id === item?.id)

  const toggle = () => {
    if (!item) return
    if (isBookmarked) removeBookmark(item.id)
    else addBookmark(item)
  }

  return { isBookmarked, toggle }
}
