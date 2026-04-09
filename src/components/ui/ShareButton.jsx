import { useState } from 'react'
import { Share2, Copy, Check } from 'lucide-react'

export default function ShareButton({ title }) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const url = window.location.href
    if (navigator.share) {
      try {
        await navigator.share({ title, url })
        return
      } catch {}
    }
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {}
  }

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-surface text-txt-muted hover:text-txt-primary border border-border-light transition-colors"
      aria-label="Share"
    >
      {copied ? <Check size={14} className="text-green-500" /> : <Share2 size={14} />}
      {copied ? 'Copied!' : 'Share'}
    </button>
  )
}
