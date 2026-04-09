import { Lightbulb } from 'lucide-react'

export default function ExamTipCard({ tip, color = '#7C3AED' }) {
  return (
    <div
      className="flex gap-3 p-4 rounded-xl border-l-4"
      style={{ borderColor: color, backgroundColor: `${color}06` }}
    >
      <Lightbulb size={20} className="flex-shrink-0 mt-0.5" style={{ color }} />
      <div>
        <h5 className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color }}>
          Exam Tip
        </h5>
        <p className="text-sm text-txt-secondary leading-relaxed">{tip}</p>
      </div>
    </div>
  )
}
