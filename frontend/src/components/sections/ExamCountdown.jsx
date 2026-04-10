import { useState, useEffect } from 'react'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { Timer } from 'lucide-react'

export default function ExamCountdown() {
  const [examDate] = useLocalStorage('examCountdownDate', null)
  const [examName] = useLocalStorage('examCountdownName', '')
  const [daysLeft, setDaysLeft] = useState(null)

  useEffect(() => {
    if (!examDate) return
    const calc = () => {
      const diff = new Date(examDate) - new Date()
      setDaysLeft(Math.max(0, Math.ceil(diff / 86400000)))
    }
    calc()
    const interval = setInterval(calc, 60000)
    return () => clearInterval(interval)
  }, [examDate])

  if (!examDate || daysLeft === null) return null

  const color = daysLeft > 60 ? '#22C55E' : daysLeft > 30 ? '#EAB308' : '#EF4444'

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-8">
      <div
        className="flex items-center gap-4 p-5 rounded-2xl border-l-4"
        style={{ borderColor: color, backgroundColor: `${color}08` }}
      >
        <Timer size={28} style={{ color }} />
        <div>
          <div className="text-sm text-txt-muted">{examName || 'Your Exam'}</div>
          <div className="text-2xl font-display font-bold" style={{ color }}>
            {daysLeft} days remaining
          </div>
        </div>
      </div>
    </section>
  )
}
