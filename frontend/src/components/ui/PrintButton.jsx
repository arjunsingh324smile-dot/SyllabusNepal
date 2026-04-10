import { Printer } from 'lucide-react'

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-surface text-txt-muted hover:text-txt-primary border border-border-light transition-colors no-print"
      aria-label="Print this page"
    >
      <Printer size={14} />
      Print
    </button>
  )
}
