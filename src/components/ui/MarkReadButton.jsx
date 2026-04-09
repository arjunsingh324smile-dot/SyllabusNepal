import { Check, Circle } from 'lucide-react'

export default function MarkReadButton({ isRead, onToggle, color = '#22C55E' }) {
  return (
    <button
      onClick={onToggle}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
        isRead
          ? 'bg-green-50 text-green-600 border border-green-200'
          : 'bg-surface text-txt-muted hover:text-txt-primary border border-border-light'
      }`}
      aria-label={isRead ? 'Mark as unread' : 'Mark as read'}
      aria-pressed={isRead}
    >
      {isRead ? <Check size={14} /> : <Circle size={14} />}
      {isRead ? 'Read' : 'Mark as Read'}
    </button>
  )
}
