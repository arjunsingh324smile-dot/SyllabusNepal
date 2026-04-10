import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

export default function FormulaBlock({ formula }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formula)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {}
  }

  return (
    <div className="relative group">
      <h5 className="text-xs font-semibold uppercase text-txt-muted tracking-wider mb-2">
        Formula
      </h5>
      <div className="bg-[#1C1C1A] rounded-lg p-4 font-mono text-sm text-green-400 whitespace-pre-wrap overflow-x-auto">
        {formula}
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 p-1.5 rounded-md bg-white/10 hover:bg-white/20 transition-colors opacity-0 group-hover:opacity-100"
          aria-label="Copy formula"
        >
          {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} className="text-gray-400" />}
        </button>
      </div>
    </div>
  )
}
